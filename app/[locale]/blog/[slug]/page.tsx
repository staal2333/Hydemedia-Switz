import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { detailBreadcrumb } from '@/lib/breadcrumbs';
import { autolink } from '@/lib/autolink';
import BlogPostClient from './BlogPostClient';
import StructuredData from '@/components/StructuredData';
import fs from 'fs';
import path from 'path';


interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  authorRole: string;
  tags: string[];
  featured: boolean;
}

// Load blog posts from JSON files
function getBlogPosts(locale: string): BlogPost[] {
  const filePath = path.join(process.cwd(), 'public', 'data', `blog-${locale}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    // notFound() here, not a noindex title: metadata resolves before the page
    // streams, so this is the only point that can still send a real 404.
    // Returning metadata let the loading boundary flush a 200 first (a soft 404).
    notFound();
  }

  // Same treatment as every other page: canonical, hreflang, and the
  // post's own image as the share card, marked up as an article.
  return generateSEOMetadata({
    // A shorter search title where the headline would be cut off in results.
    title: (post as { seoTitle?: string }).seoTitle ?? post.title,
    description: post.excerpt,
    keywords: (post.tags || []).join(', '),
    path: '/blog/' + slug,
    locale,
    image: post.image,
    type: 'article',
    publishedTime: post.date,
  });
}

export default function BlogPostPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  unstable_setRequestLocale(locale);

  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Three related articles: most shared tags first, then the newest. Every
  // post then links to others, so no article depends on the index alone.
  const related = posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, shared: (p.tags || []).filter((t) => (post.tags || []).includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map(({ p }) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.image, readTime: p.readTime }));

  return (
    <>
      <StructuredData
        type="Article"
        title={post.title}
        description={post.excerpt}
        url={'/' + locale + '/blog/' + slug}
        image={post.image}
        datePublished={post.date}
        author={post.author}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(detailBreadcrumb('https://www.hydemedia.ch', locale, 'blog', post.title, `/blog/${slug}`)),
        }}
      />
      <BlogPostClient post={{ ...post, content: autolink(post.content, locale, `/${locale}/blog/${slug}`) }} slug={slug} related={related} />
    </>
  );
}

export async function generateStaticParams() {
  // Generate params for both English and German posts
  const enPosts = getBlogPosts('en');
  const dePosts = getBlogPosts('de');

  return [
    ...enPosts.map((post) => ({ slug: post.slug, locale: 'en' })),
    ...dePosts.map((post) => ({ slug: post.slug, locale: 'de' })),
  ];
}
