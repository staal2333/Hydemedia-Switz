'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Slide {
  href: string;
  img: string;
  fallback: string;
  num: string;
  title: string[];
  sublabel?: string;
  desc: string;
  pills: { t: string; glow?: boolean }[];
  isNew?: boolean;
  comingSoon?: boolean;
}

const slides: Slide[] = [
  {
    href: '/services',
    img: '/images/placements/burgfelderstrasse-30.jpg',
    fallback: '/images/placements/burgfelderstrasse-30.jpg',
    num: '№ 001 · BASEL',
    title: ['Burgfelderstrasse', '30'],
    desc: 'Prominenter Eck-Standort an einer stark befahrenen Tramkreuzung in Basel — erreicht ÖV-Pendler, Fussgänger, Studierende und gehobenes Publikum. Bewilligung der Stadt erteilt.',
    pills: [{ t: "35'000 / Tag", glow: true }, { t: '200 m²' }, { t: 'Gerüst' }],
    isNew: true,
  },
  {
    href: '/contact',
    img: '/images/placements/Blumenrain 23-25.jpg',
    fallback: '/images/placements/Blumenrain 23-25.jpg',
    num: '№ 002 · BASEL',
    title: ['Blumenrain', '25'],
    desc: 'Grossflächige Giebel-Platzierung an der Blumenrain 25, 4051 Basel. Demnächst buchbar — weitere Details folgen in Kürze.',
    pills: [{ t: 'Giebel', glow: true }, { t: '4051 Basel' }],
    comingSoon: true,
  },
];

const slidesEn: { desc: string; pills: string[] }[] = [
  {
    desc: 'Prominent corner location at a busy tram junction in Basel — reaching public-transport commuters, pedestrians, students and an upscale audience. City permit granted.',
    pills: ["35'000 / day", '200 m²', 'Scaffolding'],
  },
  {
    desc: 'Large-format gable placement at Blumenrain 25, 4051 Basel. Soon available for booking — further details to follow shortly.',
    pills: ['Gable', '4051 Basel'],
  },
];

export default function Placements() {
  const locale = useLocale();
  const [cur, setCur] = useState(0);
  const total = slides.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hovered = useRef(false);

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hovered.current) setCur((c) => (c + 1) % total);
    }, 5500);
  }, [total]);

  useEffect(() => {
    start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [start]);

  const go = (i: number) => {
    setCur((i + total) % total);
    start();
  };

  const cs = slides[cur];

  return (
    <section className="pt-14 pb-10 md:pt-32 md:pb-16" id="placeringer">
      <div className="shell">
        {/* Head */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display font-normal text-ink m-0 max-w-[22ch]" style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {locale === 'en' ? 'Live locations —' : 'Live-Standorte —'}<br />
            <span className="italic text-mid font-normal">{locale === 'en' ? 'ready for your brand.' : 'bereit für Ihre Marke.'}</span>
          </h2>
          <span className="sec-no">{locale === 'en' ? '§ 01 · Selected locations' : '§ 01 · Ausgewählte Standorte'}</span>
        </div>

        {/* Live grid: editorial left + slideshow right */}
        <div className="grid lg:grid-cols-[1fr_1.25fr] grid-cols-1 bg-white border border-rule rounded-[20px] overflow-hidden">
          {/* Side */}
          <div className="p-10 md:p-9 flex flex-col border-rule lg:border-r border-b lg:border-b-0" style={{ background: 'linear-gradient(180deg, #fff 0%, var(--cream) 100%)' }}>
            <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-ink-soft mb-5 inline-flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full bg-mid"
                style={{ animation: 'pl-pulse 1.8s ease-in-out infinite' }}
              />
              {locale === 'en' ? 'Live · updated weekly' : 'Live · wöchentlich aktualisiert'}
            </div>
            <h3 className="font-display font-normal m-0 mb-3.5 text-ink" style={{ fontSize: 'clamp(34px, 3.4vw, 50px)', letterSpacing: '-0.025em', lineHeight: 0.95 }}>
              {locale === 'en' ? 'Selected locations' : 'Ausgewählte Standorte'}
              <br />
              <span className="italic text-mid">{locale === 'en' ? 'available now.' : 'jetzt verfügbar.'}</span>
            </h3>
            <p className="text-[14.5px] leading-[1.55] text-ink-soft m-0 mb-7 max-w-[36ch]">
              {locale === 'en'
                ? 'Premium scaffolding and facades on the busiest routes in Switzerland.'
                : 'Premium-Gerüste und Fassaden an den meistbefahrenen Strecken der Schweiz.'}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 border-t border-rule mb-7">
              {(locale === 'en'
                ? [
                    ['200', 'm²', 'Banner area'],
                    ['35', 'k', 'Traffic / day'],
                    ['25–34', '', 'Available CW'],
                    ['4', 'wks', 'Min. booking'],
                  ]
                : [
                    ['200', 'm²', 'Bannerfläche'],
                    ['35', 'k', 'Verkehr / Tag'],
                    ['25–34', '', 'Verfügbare KW'],
                    ['4', 'Wo.', 'Min. Buchung'],
                  ]
              ).map(([v, u, k], i) => (
                <div
                  key={i}
                  className={`py-4 border-b border-rule ${i % 2 === 0 ? 'pr-4 border-r' : 'pl-4'}`}
                >
                  <div className="font-display font-normal text-ink" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {v}
                    <span className="italic text-mid ml-1" style={{ fontSize: '0.55em' }}>{u}</span>
                  </div>
                  <div className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted mt-1.5">
                    {k}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/services`}
              className="mt-auto self-start inline-flex items-center gap-2 font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
            >
              <span>{locale === 'en' ? 'View all locations' : 'Alle Standorte ansehen'}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Stage */}
          <div
            className="relative bg-dusk overflow-hidden min-h-[460px] lg:min-h-[560px]"
            onMouseEnter={() => { hovered.current = true; }}
            onMouseLeave={() => { hovered.current = false; }}
          >
            {/* Counter */}
            <span className="absolute top-5 right-5 z-10 text-white font-ui font-semibold text-[11px] tracking-[0.22em] bg-dusk/50 backdrop-blur-md px-3 py-1.5 border border-white/20 rounded-full">
              <b className="text-glow font-semibold">{String(cur + 1).padStart(2, '0')}</b>
              {' / '}
              {String(total).padStart(2, '0')}
            </span>

            {/* Slides */}
            <div className="absolute inset-0">
              {slides.map((s, i) => (
                <article
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-[900ms] ${i === cur ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                  <Link
                    href={`/${locale}${s.href}`}
                    aria-label={locale === 'en' ? `View location ${s.title.join(' ')}` : `Standort ${s.title.join(' ')} ansehen`}
                    className="absolute inset-0 z-[15]"
                  />
                  <Image
                    src={s.fallback}
                    alt={s.title.join(' ')}
                    fill
                    className={`object-cover transition-transform duration-[8000ms] ease-out ${i === cur ? 'scale-[1.06]' : 'scale-100'}`}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(31,58,95,0.9) 0%, rgba(31,58,95,0.25) 45%, transparent 70%)' }}
                  />
                  {(s.isNew || s.comingSoon) && (
                    <span
                      className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 bg-glow text-dusk font-ui font-bold text-[10px] tracking-[0.24em] uppercase px-3 py-1.5 rounded-full shadow-lg"
                      style={{ animation: 'pl-pulse 2.4s ease-in-out infinite' }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-dusk" />
                      {s.comingSoon ? (locale === 'en' ? 'Coming soon' : 'Demnächst') : 'NEW'}
                    </span>
                  )}
                  <div className="absolute left-0 right-0 bottom-0 px-8 pt-8 pb-20 md:px-9 md:pt-9 md:pb-24 text-white z-10">
                    <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-glow mb-2.5">{s.num}</div>
                    <h4 className="font-display font-normal m-0 mb-1 text-white" style={{ fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 0.98, letterSpacing: '-0.02em' }}>
                      {s.title[0]} <span className="italic text-glow">{s.title[1]}</span>
                    </h4>
                    {s.sublabel && (
                      <div className="font-display italic text-glow/95 mb-2.5" style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', lineHeight: 1.2 }}>
                        — {s.sublabel}
                      </div>
                    )}
                    <p className="text-[13.5px] leading-[1.5] opacity-85 max-w-[42ch] m-0 text-white">{locale === 'en' && slidesEn[i] ? slidesEn[i].desc : s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {s.pills.map((p, j) => (
                        <span
                          key={j}
                          className={`border px-2.5 py-1 font-ui font-semibold text-[10px] tracking-[0.14em] uppercase backdrop-blur-sm ${
                            p.glow
                              ? 'bg-mid border-mid text-white'
                              : 'border-white/45 bg-white/[0.06] text-white'
                          }`}
                        >
                          {locale === 'en' && slidesEn[i] ? slidesEn[i].pills[j] : p.t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute left-9 bottom-9 flex gap-1.5 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={locale === 'en' ? `Go to slide ${i + 1}` : `Zu Slide ${i + 1} gehen`}
                  className={`h-[3px] rounded-sm transition-all ${i === cur ? 'bg-glow w-10' : 'bg-white/30 w-7 hover:bg-white/60'}`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="absolute right-6 bottom-6 flex gap-2 z-20">
              <button
                onClick={() => go(cur - 1)}
                aria-label={locale === 'en' ? 'Previous' : 'Zurück'}
                className="w-11 h-11 rounded-full border border-white/45 bg-dusk/50 backdrop-blur-md text-white font-display text-[22px] hover:bg-mid hover:border-mid hover:scale-105 transition-all"
              >
                ‹
              </button>
              <button
                onClick={() => go(cur + 1)}
                aria-label={locale === 'en' ? 'Next' : 'Weiter'}
                className="w-11 h-11 rounded-full border border-white/45 bg-dusk/50 backdrop-blur-md text-white font-display text-[22px] hover:bg-mid hover:border-mid hover:scale-105 transition-all"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
