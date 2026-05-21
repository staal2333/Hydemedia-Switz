'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  authorRole: string;
  tags: string[];
  featured: boolean;
}

export default function BlogPageClient() {
  const t = useTranslations('blogListing');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/data/blog-${locale}.json`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">{locale === 'en' ? '§ Blog' : '§ Blog'}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title')}
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('description')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-20">
          <div className="shell">
            {loading && (
              <div className="text-center py-20">
                <div className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-mid">{locale === 'en' ? 'Loading…' : 'Lädt…'}</div>
              </div>
            )}

            {!loading && featured.length > 0 && (
              <>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <h2 className="font-display font-normal m-0 text-ink" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                    {t('featuredPosts')}
                  </h2>
                  <span className="sec-no">§ {t('featuredDescription')}</span>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-16">
                  {featured.map((p) => (
                    <BlogCard key={p.id} post={p} locale={locale} large />
                  ))}
                </div>
              </>
            )}

            {!loading && rest.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="font-display font-normal m-0 text-ink" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                    {t('allPosts')}
                  </h2>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                  {rest.map((p) => (
                    <BlogCard key={p.id} post={p} locale={locale} />
                  ))}
                </div>
              </>
            )}

            {!loading && posts.length === 0 && (
              <div className="text-center py-20 text-ink-soft">{t('noResults')}</div>
            )}
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}

function BlogCard({ post, locale, large }: { post: BlogPost; locale: string; large?: boolean }) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-mid transition-all"
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(31,58,95,0.25)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent'; }}
    >
      {post.image && (
        <div className={`relative ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-fog overflow-hidden`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={large ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
          />
          <span className="absolute top-4 left-4 font-ui font-semibold text-[9px] tracking-[0.2em] uppercase text-dusk bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      )}
      <div className="p-7 flex flex-col gap-3 flex-1">
        <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">
          {new Date(post.date).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })} · {post.readTime}
        </div>
        <h3
          className="font-display font-normal m-0 text-ink"
          style={{ fontSize: large ? 28 : 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}
        >
          {post.title}
        </h3>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0 flex-1">
          {post.excerpt}
        </p>
        <div className="pt-4 border-t border-rule font-ui font-semibold text-[11px] tracking-[0.22em] uppercase text-muted group-hover:text-ink transition-colors flex items-center justify-between">
          <span>{post.author}</span>
          <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mid">{locale === 'en' ? 'Read ↗' : 'Lesen ↗'}</span>
        </div>
      </div>
    </Link>
  );
}
