import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

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
    return {
      title: 'Blog Post Not Found | Hyde Media',
    };
  }

  return {
    title: `${post.title} | Hyde Media Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
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

  return <BlogPostClient post={post} slug={slug} />;
}

export async function generateStaticParams() {
  // Generate params for German and English posts
  const dePosts = getBlogPosts('de');
  const enPosts = getBlogPosts('en');

  return [
    ...dePosts.map((post) => ({ slug: post.slug, locale: 'de' })),
    ...enPosts.map((post) => ({ slug: post.slug, locale: 'en' })),
  ];
}
