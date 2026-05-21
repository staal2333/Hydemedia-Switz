'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

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

interface Props {
  post: BlogPost;
  slug: string;
}

export default function BlogPostClient({ post }: Props) {
  const locale = useLocale();
  const t = useTranslations('blogPost');

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors mb-8"
            >
              <span>←</span> {t('backButton')}
            </Link>
            <div className="text-center">
              <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">
                § {post.category}
              </span>
              <h1
                className="font-display font-normal text-white m-0 mb-6"
                style={{ fontSize: 'clamp(32px, 4.5vw, 72px)', letterSpacing: '-0.025em', lineHeight: 1.05, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
              >
                {post.title}
              </h1>
              <p className="font-display italic text-white/85 max-w-3xl mx-auto m-0 mb-6" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: 1.4 }}>
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-3 justify-center font-mono text-[11px] tracking-[0.18em] uppercase text-white/55">
                <span>{new Date(post.date).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
                <span>·</span>
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <article className="py-16">
          <div className="shell">
            {post.image && (
              <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-fog border border-rule mb-12 max-w-5xl mx-auto">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1100px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-h1:text-[clamp(28px,3.5vw,44px)] prose-h2:text-[clamp(24px,3vw,36px)] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[20px] prose-h3:mt-8 prose-h3:mb-3 prose-p:text-ink-soft prose-p:leading-relaxed prose-p:text-[16px] prose-li:text-ink-soft prose-strong:text-ink prose-a:text-mid prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="max-w-3xl mx-auto mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-ui font-semibold text-[11px] tracking-[0.16em] uppercase text-ink-soft border border-rule rounded-full px-3.5 py-1.5 bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-rule flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted mb-1">{post.authorRole}</div>
                <div className="font-display italic text-ink" style={{ fontSize: 22, letterSpacing: '-0.015em' }}>{post.author}</div>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
              >
                {locale === 'en' ? '← All articles' : '← Alle Artikel'}
              </Link>
            </div>
          </div>
        </article>

        <section className="relative overflow-hidden py-28 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
              backgroundSize: '120px 80px',
            }}
          />
          <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-12 items-center">
            <h2 className="font-display font-normal m-0 text-white" style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}>
              {locale === 'en' ? 'Ready to make your brand ' : 'Bereit, Ihre Marke '}<span className="italic text-glow">{locale === 'en' ? 'visible?' : 'sichtbar zu machen?'}</span>
            </h2>
            <Link
              href={`/${locale}/contact`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[22px]" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Request a quote' : 'Angebot anfordern'}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
