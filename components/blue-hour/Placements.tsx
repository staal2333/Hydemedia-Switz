'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getCurrentPlacements, getCasesForPlacement, localizePlacement, placementPath, PLACEMENT_KINDS, type Placement, type PlacementKind } from '@/lib/placements';

const COPY = {
  de: {
    kind: { scaffolding: 'Gerüst', facade: 'Fassade', digital: 'Digital' } as Record<PlacementKind, string>,
    weekly: 'pro Woche',
    daily: 'pro Tag',
    h2a: 'Live-Standorte —',
    h2b: 'bereit für Ihre Marke.',
    sec: '§ 01 · Ausgewählte Standorte',
    live: 'Live · wöchentlich aktualisiert',
    h3a: 'Ausgewählte Standorte',
    h3b: 'im Moment.',
    lede: 'Gerüst- und Fassadenflächen an den verkehrsreichsten Orten in Basel und der Schweiz.',
    active: 'Aktive Standorte',
    weeklyImpr: 'Kontakte / Woche',
    formatsFrom: 'Formate',
    week: 'Wo.',
    minBooking: 'Min. Buchung',
    seeAll: 'Alle Standorte ansehen',
    seePlacement: (n: string) => `Standort ${n} ansehen`,
    goToSlide: (i: number) => `Zu Slide ${i} gehen`,
    prev: 'Zurück',
    next: 'Weiter',
    booked: 'Gebucht',
    bookedBy: (brand: string) => `gebucht von ${brand}`,
  },
  en: {
    kind: { scaffolding: 'Scaffolding', facade: 'Facade', digital: 'Digital' } as Record<PlacementKind, string>,
    weekly: 'weekly',
    daily: 'daily',
    h2a: 'Live placements —',
    h2b: 'ready for your brand.',
    sec: '§ 01 · Featured placements',
    live: 'Live · updated weekly',
    h3a: 'Featured placements',
    h3b: 'right now.',
    lede: 'Scaffolding and facade sites at the busiest spots in Basel and Switzerland.',
    active: 'Active sites',
    weeklyImpr: 'Contacts / week',
    formatsFrom: 'Formats',
    week: 'wks',
    minBooking: 'Min. booking',
    seeAll: 'See all placements',
    seePlacement: (n: string) => `View placement ${n}`,
    goToSlide: (i: number) => `Go to slide ${i}`,
    prev: 'Previous',
    next: 'Next',
    booked: 'Booked',
    bookedBy: (brand: string) => `booked by ${brand}`,
  },
};

type Copy = (typeof COPY)['de'];

/** "39'851 pro Tag" → 39851 */
function trafficCount(traffic: string): number {
  return Number(traffic.split(' ')[0].replace(/['’.,]/g, '')) || 0;
}

const isWeekly = (traffic: string) => /wöch|week/i.test(traffic);

/** "39'851 pro Tag" → "40k pro Tag" */
function shortTraffic(traffic: string, t: Copy): string {
  const n = trafficCount(traffic);
  const weekly = isWeekly(traffic);
  const label = weekly ? t.weekly : t.daily;
  return `${n >= 1000 ? Math.round(n / 1000) + 'k' : n} ${label}`;
}

/** Weekly exposure across the live portfolio, in millions. */
function weeklyImpressionsM(list: Placement[]): string {
  const total = list.reduce(
    (sum, p) => sum + trafficCount(p.traffic) * (isWeekly(p.traffic) ? 1 : 7),
    0,
  );
  return (total / 1_000_000).toFixed(1);
}

// A placement marked `flagship` opens the reel. After it, digital leads,
// because a screen in motion stops the scroll in a way a still cannot.
// The rest follow in portfolio order.
const REEL_ORDER: PlacementKind[] = ['digital', 'scaffolding', 'facade'];

/**
 * Slides come straight from the live portfolio — a retired placement can
 * never linger on the front page advertising itself as bookable. Placements
 * flagged `featured: false` are held back for the section pages.
 */
function buildSlides(locale: string, t: Copy) {
  const live = REEL_ORDER.flatMap((kind) =>
    getCurrentPlacements(kind)
      .filter((p) => p.featured !== false)
      .map((p) => ({ p, kind })),
  );
  // Array.prototype.sort is stable, so everything else keeps its order.
  // Flagship first, then anything with a photo: a site still waiting for its
  // photos should not open the reel as an empty frame.
  const hasMedia = (p: Placement) => Boolean(p.video || p.image);
  return live
    .sort((a, b) => Number(Boolean(b.p.flagship)) - Number(Boolean(a.p.flagship)) || Number(hasMedia(b.p)) - Number(hasMedia(a.p)))
    .map(({ p, kind }, i) => {
    // Display text is localized; traffic numbers are parsed from the original.
    const lp = localizePlacement(p, locale);
    const words = lp.name.split(' ');
    // A booked site links to the campaign running on it — proof it delivers.
    const bookedCase = p.status === 'booked' ? getCasesForPlacement(p)[0] : undefined;
    const sublabel = bookedCase
      ? t.bookedBy(bookedCase.brand)
      : lp.address.includes(' · ') ? lp.address.split(' · ').pop() : undefined;
    return {
      href: bookedCase ? `/cases/${bookedCase.slug}` : placementPath(p),
      fallback: p.image,
      video: p.video,
      num: `№ ${String(i + 1).padStart(3, '0')} · ${lp.location.toUpperCase()}`,
      // Last word takes the italic accent; a single-word name becomes the accent entirely.
      title: words.length > 1 ? [words.slice(0, -1).join(' '), words[words.length - 1]] : ['', lp.name],
      sublabel,
      desc: lp.features[0] ?? '',
      pills: [
        { t: shortTraffic(p.traffic, t), glow: true },
        { t: p.size },
        { t: t.kind[kind] },
      ] as { t: string; glow?: boolean }[],
      isNew: Boolean(p.isNew),
      flagship: Boolean(p.flagship),
      booked: p.status === 'booked',
    };
  });
}

const SLIDE_MS = 5500;
const livePlacements = PLACEMENT_KINDS.flatMap((k) => getCurrentPlacements(k));
// Digital screens have no square-metre format, so they sit outside the range.
const formatWidths = livePlacements.map((p) => p.dimensions.width).filter((w) => w > 0);
const FORMAT_RANGE = formatWidths.length
  ? Math.min(...formatWidths) === Math.max(...formatWidths)
    ? String(formatWidths[0])
    : `${Math.min(...formatWidths)}–${Math.max(...formatWidths)}`
  : '—';
const ACTIVE_COUNT = String(livePlacements.length);
const WEEKLY_M = weeklyImpressionsM(livePlacements);

export default function Placements() {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const slides = useMemo(() => buildSlides(locale, t), [locale, t]);
  const weeklyM = locale === 'en' ? WEEKLY_M : WEEKLY_M.replace('.', ',');
  const [cur, setCur] = useState(0);
  const total = slides.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hovered = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // The reel sits below the fold. Until it is on screen it neither advances
  // nor plays video, so a visitor meets the flagship first and a phone does
  // not download a clip nobody is watching.
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Only the visible slide's clip runs. The `autoplay` attribute is no use
  // here: slides are all mounted at once and cross-faded, so playback has to
  // follow the active index. Reduced-motion viewers keep the poster.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === cur && !reduce && inView) {
        el.play().catch(() => { /* refused — poster stands in */ });
      } else {
        el.pause();
      }
    });
  }, [cur, inView]);

  // A video slide holds long enough to finish its loop; stills use the base
  // beat. Otherwise the 8s screen clip would be cut off at 5.5s every time.
  const start = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const el = videoRefs.current[cur];
    const hold = el && Number.isFinite(el.duration) && el.duration > 0
      ? Math.max(SLIDE_MS, el.duration * 1000)
      : SLIDE_MS;
    timerRef.current = setTimeout(() => {
      if (hovered.current) { start(); return; }
      setCur((c) => (c + 1) % total);
    }, hold);
  }, [total, cur]);

  useEffect(() => {
    if (!inView) return;
    start();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [start, inView]);

  const go = (i: number) => {
    setCur((i + total) % total);
    start();
  };

  const cs = slides[cur];

  return (
    <section ref={sectionRef} className="pt-14 pb-10 md:pt-32 md:pb-16" id="standorte">
      <div className="shell">
        {/* Head */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display font-normal text-ink m-0 max-w-[22ch]" style={{ fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {t.h2a}<br />
            <span className="italic text-mid font-normal">{t.h2b}</span>
          </h2>
          <span className="sec-no">{t.sec}</span>
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
              {t.live}
            </div>
            <h3 className="font-display font-normal m-0 mb-3.5 text-ink" style={{ fontSize: 'clamp(34px, 3.4vw, 50px)', letterSpacing: '-0.025em', lineHeight: 0.95 }}>
              {t.h3a}
              <br />
              <span className="italic text-mid">{t.h3b}</span>
            </h3>
            <p className="text-[14.5px] leading-[1.55] text-ink-soft m-0 mb-7 max-w-[36ch]">
              {t.lede}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 border-t border-rule mb-7">
              {[
                [ACTIVE_COUNT, '', t.active],
                [weeklyM, 'M', t.weeklyImpr],
                [FORMAT_RANGE, 'm²', t.formatsFrom],
                ['4', t.week, t.minBooking],
              ].map(([v, u, k], i) => (
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
              href={`/${locale}/standorte`}
              className="mt-auto self-start inline-flex items-center gap-2 font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
            >
              <span>{t.seeAll}</span>
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
                    aria-label={t.seePlacement(s.title.join(' ').trim())}
                    className="absolute inset-0 z-[15]"
                  />
                  {s.video ? (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={s.video.src}
                      poster={s.video.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={s.title.join(' ').trim()}
                    />
                  ) : s.fallback ? (
                    <Image
                      src={s.fallback}
                      alt={s.title.join(' ')}
                      fill
                      className={`object-cover transition-transform duration-[8000ms] ease-out ${i === cur ? 'scale-[1.06]' : 'scale-100'}`}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(31,58,95,0.9) 0%, rgba(31,58,95,0.25) 45%, transparent 70%)' }}
                  />
                  {s.booked && (
                    <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 bg-white/90 text-dusk font-ui font-bold text-[10px] tracking-[0.24em] uppercase px-3 py-1.5 rounded-full shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-dusk" />
                      {t.booked}
                    </span>
                  )}
                  {!s.booked && (s.isNew || s.flagship) && (
                    <span
                      className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 bg-glow text-dusk font-ui font-bold text-[10px] tracking-[0.24em] uppercase px-3 py-1.5 rounded-full shadow-lg"
                      style={{ animation: 'pl-pulse 2.4s ease-in-out infinite' }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-dusk" />
                      {s.flagship ? 'FLAGSHIP' : 'NEW'}
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
                    <p className="text-[13.5px] leading-[1.5] opacity-85 max-w-[42ch] m-0 text-white">{s.desc}</p>
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
                          {p.t}
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
                  aria-label={t.goToSlide(i + 1)}
                  className={`h-[3px] rounded-sm transition-all ${i === cur ? 'bg-glow w-10' : 'bg-white/30 w-7 hover:bg-white/60'}`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="absolute right-6 bottom-6 flex gap-2 z-20">
              <button
                onClick={() => go(cur - 1)}
                aria-label={t.prev}
                className="w-11 h-11 rounded-full border border-white/45 bg-dusk/50 backdrop-blur-md text-white font-display text-[22px] hover:bg-mid hover:border-mid hover:scale-105 transition-all"
              >
                ‹
              </button>
              <button
                onClick={() => go(cur + 1)}
                aria-label={t.next}
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
