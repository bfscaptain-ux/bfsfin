import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/portal/',
        '/api/',
        '/partner-dashboard/',
      ],
    },
    sitemap: 'https://bfsfin.com/sitemap.xml',
  };
}
