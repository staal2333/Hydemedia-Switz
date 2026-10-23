import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { PLACEMENT_KINDS, getCurrentPlacements, placementPath } from '@/lib/placements';

/**
 * lastModified is only set where we know a real date: a blog post's publish
 * date. File modification times are no use here, because every Vercel build
 * checks the files out fresh, so every page would claim to change on every
 * deploy, and Google learns to ignore a sitemap's dates when they are wrong.
 *
 * Every page exists in German and English under the same path, so each entry
 * names its counterpart (hreflang) as well.
 */

const SITE = 'https://www.hydemedia.ch';
const LOCALES = ['de', 'en'] as const;

function entry(
  locale: string,
  p: string,
  extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE}/${locale}${p}`,
    alternates: {
      languages: {
        'de-CH': `${SITE}/de${p}`,
        en: `${SITE}/en${p}`,
        'x-default': `${SITE}/de${p}`,
      },
    },
    ...extra,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/scaffolding', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/facade', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/standorte', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/geruestwerbung-basel', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/megaposter', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/cases', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/kampagnenrechner', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/ooh-im-medienmix', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/glossar', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/brands', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/property-owners', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/presse', priority: 0.4, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  const readJson = <T,>(rel: string): T[] => {
    try {
      return JSON.parse(fs.readFileSync(path.join(process.cwd(), rel), 'utf8')) as T[];
    } catch {
      return [];
    }
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const r of routes) {
      entries.push(entry(locale, r.path, { changeFrequency: r.changeFrequency, priority: r.priority }));
    }

    // One page per placement still in the portfolio. Retired ones stay
    // reachable for old links but are noindex, so they are not listed.
    for (const p of PLACEMENT_KINDS.flatMap(getCurrentPlacements)) {
      entries.push(entry(locale, placementPath(p), { changeFrequency: 'weekly', priority: 0.8 }));
    }

    for (const c of readJson<{ slug: string }>('public/data/cases.json')) {
      entries.push(entry(locale, `/cases/${c.slug}`, { changeFrequency: 'monthly', priority: 0.7 }));
    }
  }

  // Blog posts are listed per locale from that locale's own file, so a post
  // only appears where it really exists.
  const posts = Object.fromEntries(
    LOCALES.map((l) => [l, readJson<{ slug: string; date?: string }>(`public/data/blog-${l}.json`)]),
  ) as Record<(typeof LOCALES)[number], { slug: string; date?: string }[]>;
  for (const locale of LOCALES) {
    for (const post of posts[locale]) {
      const dated = post.date ? new Date(post.date) : null;
      const inBoth = LOCALES.every((l) => posts[l].some((x) => x.slug === post.slug));
      const extra = {
        ...(dated && !Number.isNaN(dated.valueOf()) ? { lastModified: dated } : {}),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
      entries.push(inBoth ? entry(locale, `/blog/${post.slug}`, extra) : { url: `${SITE}/${locale}/blog/${post.slug}`, ...extra });
    }
  }

  return entries;
}
