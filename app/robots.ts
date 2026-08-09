import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/result/', '/book/', '/api/'],
    },
    sitemap: 'https://www.yogzan.com/sitemap.xml',
  };
}