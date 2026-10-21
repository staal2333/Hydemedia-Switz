'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const COPY = {
  de: { h2a: 'Wissen über ', h2b: 'Aussenwerbung.', all: 'Alle Artikel ansehen →', article: 'Artikel', read: 'Lesen ↗' },
  en: { h2a: 'Insights on ', h2b: 'outdoor.', all: 'See all articles →', article: 'Article', read: 'Read ↗' },
} as const;

export interface JournalPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

/**
 * Three most recent articles on the homepage. Posts arrive as a prop from the
 * server so the cards ship in the HTML — and so the homepage bundle does not
 * carry every locale's blog content.
 */
export default function JournalStrip({ posts }: { posts: JournalPost[] }) {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28" id="journal">
      <div className="shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <h2
            className="font-display font-normal text-ink m-0 max-w-[20ch]"
            style={{ fontSize: 'clamp(32px, 4.2vw, 60px)', letterSpacing: '-0.03em', lineHeight: 1.02 }}
          >
            {t.h2a}<span className="italic text-mid">{t.h2b}</span>
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
          >
            {t.all}
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/blog/${p.slug}`}
              className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-mid transition-all"
            >
              <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                />
                <span className="absolute top-4 left-4 font-ui font-semibold text-[9px] tracking-[0.2em] uppercase text-dusk bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-7 flex flex-col gap-3 flex-1">
                <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">
                  {new Date(p.date).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })} · {p.readTime}
                </div>
                <h3
                  className="font-display font-normal m-0 text-ink"
                  style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0 flex-1">{p.excerpt}</p>
                <div className="pt-4 border-t border-rule font-ui font-semibold text-[11px] tracking-[0.22em] uppercase text-muted group-hover:text-ink transition-colors flex items-center justify-between">
                  <span>{t.article}</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mid">{t.read}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
