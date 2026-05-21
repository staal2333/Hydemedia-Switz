'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const items = [
  {
    num: '01 / 02',
    img: '/images/placements/burgfelderstrasse-30.jpg',
    h: ['Gerüst', 'werbung'],
    p: 'Grossformat-Banner auf aktiven Gerüsten. Von 40 bis 380 m², zertifizierte Montage, professionelle Demontage.',
    meta: '40 — 380 m²',
    href: '/scaffolding',
  },
  {
    num: '02 / 02',
    img: '/images/placements/Blumenrain 23-25.jpg',
    h: ['Fassaden', 'werbung'],
    p: 'Langfristige Markenmomente direkt an der Fassade. Bewilligungen geregelt, witterungsbeständiger Druck, farbgenaue Produktion.',
    meta: '6 — 36 Mt.',
    href: '/facade',
  },
];

export default function Solutions() {
  const locale = useLocale();

  return (
    <section id="losninger" className="py-14 md:py-32">
      <div className="shell">
        {/* Head */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display font-normal text-ink m-0 max-w-[18ch]" style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {locale === 'en' ? 'Outdoor marketing ' : 'Outdoor-Marketing-'}<span className="italic text-mid">{locale === 'en' ? 'solutions.' : 'Lösungen.'}</span>
          </h2>
          <span className="sec-no">{locale === 'en' ? '§ 02 · Choose format' : '§ 02 · Format wählen'}</span>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {items.map((s, i) => (
            <Link
              href={`/${locale}${s.href}`}
              key={i}
              className="group bg-white border border-rule rounded-[20px] overflow-hidden grid sm:grid-cols-2 grid-cols-1 min-h-[380px] hover:-translate-y-1.5 hover:border-mid transition-all"
              style={{ boxShadow: '0 0 0 0 transparent' }}
              onMouseEnter={(e) => { (e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(31,58,95,0.25)'); }}
              onMouseLeave={(e) => { (e.currentTarget.style.boxShadow = '0 0 0 0 transparent'); }}
            >
              <div className="bg-sky-2 relative overflow-hidden min-h-[200px]">
                <Image
                  src={s.img}
                  alt={locale === 'en' ? `${i === 0 ? 'Scaffolding' : 'Facade'} advertising` : s.h.join(' ')}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-8 flex flex-col justify-between gap-5">
                <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted flex justify-between">
                  <span>{s.num}</span>
                  <span>OOH · CH</span>
                </div>
                <h3 className="font-display font-normal m-0 text-ink" style={{ fontSize: 40, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {locale === 'en' ? (i === 0 ? 'Scaffolding' : 'Facade') : s.h[0]}
                  <br />
                  <span className="italic text-mid">{locale === 'en' ? 'advertising' : s.h[1]}</span>
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0">{locale === 'en' ? (i === 0 ? 'Large-format banners on active scaffolding. From 40 to 380 m², certified installation, professional removal.' : 'Long-term brand moments directly on the facade. Permits handled, weather-resistant printing, colour-accurate production.') : s.p}</p>
                <div className="flex justify-between items-center pt-4.5 border-t border-rule font-ui font-semibold text-[11px] tracking-[0.22em] uppercase text-muted group-hover:text-ink transition-colors">
                  <span>{s.meta}</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mid">
                    {locale === 'en' ? 'Discover ↗' : 'Entdecken ↗'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
