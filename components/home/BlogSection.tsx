'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogSection() {
  const t = useTranslations('home.blog');
  const locale = useLocale();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`/data/blog-${locale}.json`)
      .then((res) => res.json())
      .then((data) => {
        // Take only first 3 posts
        setBlogPosts(data.slice(0, 3));
      })
      .catch((error) => {
        console.error('Error loading blog posts:', error);
      });
  }, [locale]);

  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle decorations only */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl animate-float-cloud" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-100/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: '5s' }} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString(locale === 'da' ? 'da-DK' : locale === 'de' ? 'de-CH' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            {t('viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
