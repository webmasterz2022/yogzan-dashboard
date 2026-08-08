// Build-time sitemap generator for yogzan.com
// Fetches live categories from api.yogzan.com and writes public/sitemap.xml
// covering static routes + all /price-list/:category/:city combos in id + en.

const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE = 'https://www.yogzan.com';
const API = 'https://api.yogzan.com/category';
const OUT = path.join(__dirname, '..', 'public', 'sitemap.xml');

const STATIC_ROUTES = [
  { path: '/',        priority: '1.0', changefreq: 'weekly'  },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly'  },
  { path: '/career',  priority: '0.5', changefreq: 'monthly' },
  { path: '/fixbook', priority: '0.7', changefreq: 'monthly' },
];

// URL-unsafe or non-content pages we never want indexed
const EXCLUDE_CITY_NAMES = new Set(['Terms_of_Service']);

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function encodeSegment(s) {
  return encodeURIComponent(s);
}

function xmlUrl({ loc, changefreq, priority, lastmod }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    '  </url>',
  ].filter(Boolean).join('\n');
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];

  // Static routes — id + en variants
  for (const r of STATIC_ROUTES) {
    urls.push({ loc: `${SITE}${r.path}`, changefreq: r.changefreq, priority: r.priority, lastmod: today });
    const enPath = r.path === '/' ? '/en' : `/en${r.path}`;
    urls.push({ loc: `${SITE}${enPath}`, changefreq: r.changefreq, priority: (parseFloat(r.priority) - 0.1).toFixed(1), lastmod: today });
  }

  // Dynamic price-list routes from live API
  let categories = [];
  try {
    categories = await fetchJson(API);
    console.log(`✓ fetched ${categories.length} categories from ${API}`);
  } catch (err) {
    console.warn(`⚠ could not fetch ${API}: ${err.message}`);
    console.warn('  → sitemap will only include static routes');
  }

  for (const cat of categories) {
    const catName = cat?.name;
    if (!catName) continue;
    const cities = Array.isArray(cat.cities) ? cat.cities : [];
    for (const city of cities) {
      const cityName = city?.name;
      if (!cityName || EXCLUDE_CITY_NAMES.has(cityName)) continue;
      const idLoc = `${SITE}/price-list/${encodeSegment(catName)}/${encodeSegment(cityName)}`;
      const enLoc = `${SITE}/en/price-list/${encodeSegment(catName)}/${encodeSegment(cityName)}`;
      urls.push({ loc: idLoc, changefreq: 'monthly', priority: '0.9', lastmod: today });
      urls.push({ loc: enLoc, changefreq: 'monthly', priority: '0.8', lastmod: today });
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(xmlUrl).join('\n') + '\n' +
    '</urlset>\n';

  fs.writeFileSync(OUT, xml);
  console.log(`✓ wrote ${urls.length} URLs → ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error('sitemap generation failed:', err);
  process.exit(1);
});
