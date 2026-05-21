'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const cards = [
  {
    id: 'brands',
    letter: 'A.',
    label: 'Für Marken',
    h: 'Für',
    h2: 'Marken.',
    bullets: [
      'Hohe tägliche Reichweite in stark frequentierten Stadtgebieten.',
      'Längere Sichtbarkeitsdauer als traditionelle OOH-Formate.',
      'Raum für kreative Kampagnen mit starker visueller Wirkung.',
      'Beratung zu Grossformat-Design und OOH-Strategie.',
    ],
    meta: 'Kampagnen ab 140 m²',
    href: '/brands',
  },
  {
    id: 'ejendomsejere',
    letter: 'B.',
    label: 'Für Immobilieneigentümer',
    h: 'Für',
    h2: 'Immobilieneigentümer.',
    bullets: [
      'Zusätzliche Einnahmen aus sonst ungenutzten Fassaden und Gerüsten.',
      'Wir kümmern uns um Bewilligungen, Produktion und Installation.',
      'Professionelle, sichere Montage und Demontage.',
      'Erfahrung mit Gerüstwerbung und Fassadenwerbung in der ganzen Schweiz.',
    ],
    meta: 'Partnerprogramm',
    href: '/property-owners',
  },
];

const cardsEn: Record<string, { label: string; h: string; h2: string; bullets: string[]; meta: string }> = {
  brands: {
    label: 'For brands',
    h: 'For',
    h2: 'brands.',
    bullets: [
      'High daily reach in busy, high-footfall urban areas.',
      'Longer visibility duration than traditional OOH formats.',
      'Room for creative campaigns with strong visual impact.',
      'Advice on large-format design and OOH strategy.',
    ],
    meta: 'Campaigns from 140 m²',
  },
  ejendomsejere: {
    label: 'For property owners',
    h: 'For',
    h2: 'property owners.',
    bullets: [
      'Additional revenue from otherwise unused facades and scaffolding.',
      'We take care of permits, production and installation.',
      'Professional, safe installation and removal.',
      'Experience with scaffolding and facade advertising across Switzerland.',
    ],
    meta: 'Partner programme',
  },
};

export default function Audience() {
  const locale = useLocale();

  return (
    <section className="py-14 md:py-32">
      <div className="shell">
        {/* Head */}
        <div className="mb-14 grid lg:grid-cols-[1.4fr_1fr] grid-cols-1 gap-12 items-end">
          <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {locale === 'en' ? 'Who we ' : 'Wen wir '}<span className="italic text-mid">{locale === 'en' ? 'serve.' : 'betreuen.'}</span>
          </h2>
          <p className="font-display italic font-normal text-ink-soft m-0 max-w-[42ch]" style={{ fontSize: 20, lineHeight: 1.4 }}>
            {locale === 'en'
              ? 'Tailored solutions for brands and property owners — from strategy to removal.'
              : 'Massgeschneiderte Lösungen für Marken und Immobilieneigentümer — von der Strategie bis zur Demontage.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {cards.map((c) => {
            const en = cardsEn[c.id];
            return (
            <div
              key={c.id}
              id={c.id}
              className="bg-white border border-rule rounded-[20px] p-9 md:p-10 flex flex-col gap-5 hover:-translate-y-1.5 hover:border-mid transition-all"
              onMouseEnter={(e) => { (e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(31,58,95,0.25)'); }}
              onMouseLeave={(e) => { (e.currentTarget.style.boxShadow = '0 0 0 0 transparent'); }}
            >
              <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted flex justify-between">
                <span>{c.letter}</span>
                <span>{locale === 'en' ? en.label : c.label}</span>
              </div>
              <h3 className="font-display font-normal m-0 text-ink" style={{ fontSize: 44, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {locale === 'en' ? en.h : c.h} <span className="italic text-mid">{locale === 'en' ? en.h2 : c.h2}</span>
              </h3>
              <ul className="m-0 mt-1 p-0 list-none flex flex-col gap-3.5">
                {(locale === 'en' ? en.bullets : c.bullets).map((b, i) => (
                  <li key={i} className="flex gap-3.5 items-start text-[15px] leading-[1.55] text-ink-soft">
                    <span aria-hidden className="font-display italic text-mid text-[18px] leading-[1.2] shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5.5 border-t border-rule flex justify-between items-center font-ui font-semibold text-[11px] tracking-[0.22em] uppercase text-muted">
                <span>{locale === 'en' ? en.meta : c.meta}</span>
                <Link href={`/${locale}${c.href}`} className="text-ink inline-flex gap-2.5 items-center hover:text-mid transition-colors">
                  {locale === 'en' ? 'Learn more' : 'Mehr erfahren'} <span>↗</span>
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
