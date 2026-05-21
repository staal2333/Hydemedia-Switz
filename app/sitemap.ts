import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const chBaseUrl = 'https://www.hydemedia.ch';

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/facade', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/cases', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/partners', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/property-owners', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Swiss domain (de + en)
  ['de', 'en'].forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${chBaseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  return sitemapEntries;
}
