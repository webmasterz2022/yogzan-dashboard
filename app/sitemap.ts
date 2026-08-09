import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.yogzan.com';

// Cities served (matches price list pages rendered in the app)
const CITIES = [
  'Bandung',
  'Malang',
  'Semarang',
  'Surabaya',
  'Jabodetabek',
  'Yogyakarta',
  'Bali',
];

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

// Mirrors legacy CRA sitemap (24 URLs): id locale unprefixed, en prefixed,
// spaces URL-encoded (e.g. "Cetak Album/Album Only" -> Cetak%20Album/Album%20Only).
const localePrefix = (locale: 'id' | 'en', path: string) =>
  locale === 'id' ? path : path === '/' ? '/en' : `/en${path}`;

const enc = (path: string) =>
  path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  const add = (
    path: string,
    idPriority: number,
    enPriority: number,
    changeFrequency: Freq = 'monthly',
  ) => {
    for (const locale of ['id', 'en'] as const) {
      urls.push({
        url: `${BASE_URL}${enc(localePrefix(locale, path))}`,
        lastModified: new Date('2026-08-08'),
        changeFrequency,
        priority: locale === 'id' ? idPriority : enPriority,
      });
    }
  };

  add('/', 1.0, 0.9, 'weekly');
  add('/gallery', 0.8, 0.7, 'weekly');
  add('/career', 0.5, 0.4);
  add('/fixbook', 0.7, 0.6);
  for (const city of CITIES) {
    add(`/price-list/Wisuda/${city}`, 0.9, 0.8);
  }
  add('/price-list/Cetak Album/Album Only', 0.9, 0.8);
  return urls;
}