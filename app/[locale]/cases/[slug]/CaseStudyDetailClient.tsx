'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

interface CaseStudy {
  id: number;
  slug: string;
  brand: string;
  title: string;
  location: string;
  format: string;
  size: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial: string;
  images: string[];
  tags: string[];
  type: string;
}

export default function CaseStudyDetailClient({ caseStudy }: { caseStudy: CaseStudy }) {
  const locale = useLocale();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const c = caseStudy;
  const heroImage = c.images?.[selectedImageIndex] ?? c.images?.[0];

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors mb-8"
            >
              <span>←</span> {locale === 'en' ? 'Back to all references' : 'Zurück zu allen Referenzen'}
            </Link>
            <div className="text-center">
              <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">
                § {c.location}
              </span>
              <h1
                className="font-display font-normal text-white m-0 mb-6"
                style={{ fontSize: 'clamp(36px, 5.5vw, 88px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
              >
                {c.brand} <span className="italic text-cream">— {c.format.toLowerCase()}</span>
              </h1>
              <p className="font-display italic text-white/85 max-w-3xl mx-auto m-0" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                {c.title}
              </p>
            </div>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── HERO IMAGE + meta ── */}
      <section className="py-16 md:py-20">
        <div className="shell">
          {heroImage && (
            <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-fog border border-rule mb-8 max-w-6xl mx-auto">
              <Image
                src={heroImage}
                alt={`${c.brand} – ${c.location}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Image thumbnails */}
          {c.images && c.images.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-6xl mx-auto">
              {c.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImageIndex ? 'border-mid scale-105' : 'border-rule hover:border-mid/50'
                  }`}
                >
                  <Image src={img} alt={`Image ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule rounded-[20px] overflow-hidden border border-rule max-w-5xl mx-auto">
            {[
              { v: c.location, k: locale === 'en' ? 'Location' : 'Standort' },
              { v: c.size, k: locale === 'en' ? 'Size' : 'Grösse' },
              { v: c.duration, k: locale === 'en' ? 'Duration' : 'Dauer' },
              { v: c.format, k: 'Format' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-5 text-center">
                <div className="font-display font-normal text-ink mb-1.5" style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {s.v}
                </div>
                <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION / RESULTS ── */}
      <section className="py-20">
        <div className="shell">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 max-w-6xl mx-auto">
            {[
              { num: 'i.', title: locale === 'en' ? 'Challenge' : 'Herausforderung', body: c.challenge },
              { num: 'ii.', title: locale === 'en' ? 'Solution' : 'Lösung', body: c.solution },
              { num: 'iii.', title: locale === 'en' ? 'Results' : 'Resultate', body: c.results },
            ].map((s) => (
              <div key={s.num}>
                <div className="font-display italic font-normal text-mid mb-4 inline-flex items-center gap-3" style={{ fontSize: 32, lineHeight: 1 }}>
                  {s.num}
                  <span aria-hidden className="block h-px w-10 bg-mid opacity-50" />
                </div>
                <h3 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {s.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-ink-soft m-0">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {c.testimonial && (
        <section className="py-24">
          <div className="shell">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-display italic text-mid mb-6 inline-block" style={{ fontSize: 80, lineHeight: 0.5 }}>
                &ldquo;
              </span>
              <p
                className="font-display italic font-normal text-ink m-0 mb-6"
                style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', letterSpacing: '-0.01em', lineHeight: 1.35 }}
              >
                {c.testimonial}
              </p>
              <div className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-muted">
                — {c.brand}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAGS ── */}
      {c.tags && c.tags.length > 0 && (
        <section className="pb-12">
          <div className="shell">
            <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-ui font-semibold text-[11px] tracking-[0.16em] uppercase text-ink-soft border border-rule rounded-full px-3.5 py-1.5 bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ── */}
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
          <h2
            className="font-display font-normal m-0 text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
          >
            {locale === 'en' ? 'Ready for' : 'Bereit für'} <span className="italic text-glow">{locale === 'en' ? 'your own story?' : 'Ihre eigene Story?'}</span>
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
          >
            <span className="font-display italic font-normal text-[22px]" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Request a proposal' : 'Angebot anfordern'}</span>
            <span className="text-glow text-[20px]">↗</span>
          </Link>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
