import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import blogDe from '@/public/data/blog-de.json';
import blogEn from '@/public/data/blog-en.json';


const postsFor = (locale: string) => (locale === 'en' ? blogEn : blogDe);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blogListing' });
  const newest = postsFor(locale)[0];

  // The index used to return only title and description and inherited a
  // site-wide canonical pointing at the homepage. It now sets its own.
  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    keywords:
      locale !== 'en'
        ? 'Aussenwerbung Blog, Gerüstwerbung Ratgeber, Fassadenwerbung Ratgeber, OOH Wissen, Aussenwerbung Schweiz'
        : 'outdoor advertising blog, scaffolding advertising guide, facade advertising guide, OOH insights, outdoor advertising Switzerland',
    path: '/blog',
    locale,
    image: newest?.image,
  });
}

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  // Resolved on the server so the post list ships in the HTML: the index is
  // the crawl entry point for every article, and a client-side fetch left it
  // empty for anything that does not run JavaScript.
  // Cards render metadata only — shipping every article body would put the
  // whole blog in the index payload for nothing.
  const posts = postsFor(locale).map(({ content, ...card }) => card);

  return <BlogPageClient posts={posts} />;
}
