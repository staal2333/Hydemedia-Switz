'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  getCurrentPlacements,
  getPastPlacements,
  getCasesForPlacement,
  localizePlacement,
  placementPath,
  type Placement,
  type PlacementKind,
  placeLabel,
} from '@/lib/placements';
import DuskHero from './DuskHero';
import GroundFlow from './GroundFlow';

const COPY = {
  de: {
    photo: (name: string, i: number, n: number) => `${name} — Foto ${i} von ${n}`,
    campaignsHere: 'Kampagnen hier',
    details: 'Standort ansehen',
    book: 'Buchen',
    call: 'Anrufen',
    phone: '+41 77 233 81 21',
  },
  en: {
    photo: (name: string, i: number, n: number) => `${name} — photo ${i} of ${n}`,
    campaignsHere: 'Campaigns here',
    details: 'View placement',
    book: 'Book',
    call: 'Call',
    phone: '+41 77 233 81 21',
  },
};

interface Props {
  /** Which slice of placements.json to render. */
  kind: PlacementKind;
  /** next-intl namespace holding title/description/status/details/cta. */
  namespace: 'scaffolding' | 'facade';
  /** Small caps label above the H1. */
  eyebrow: string;
  /** Facade durations read as "Langfristig"; scaffolding as "KW 44–47". */
  stripWeekPrefix?: boolean;
  /** Server-rendered extras (guide, FAQ) shown before the final call to action. */
  children?: ReactNode;
}

/** Small caps status pill shown on each placement photo. */
export function StatusBadge({ status, label }: { status: Placement['status']; label: string }) {
  const isPast = status === 'past';
  return (
    <div
      className={`absolute top-5 left-5 inline-flex items-center gap-2 backdrop-blur-md px-3.5 py-2 rounded-full font-ui font-semibold text-[10px] tracking-[0.22em] uppercase ${
        isPast ? 'bg-dusk/70 text-white/90' : 'bg-white/88 text-dusk'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isPast ? 'bg-white/50' : 'bg-mid'}`}
        style={isPast ? undefined : { animation: 'pl-blink 1.5s ease-in-out infinite' }}
      />
      {label}
    </div>
  );
}

/**
 * The placement photo, plus a thumbnail strip when several exist. Different
 * campaigns on the same spot are the best argument for it, so more than one
 * shot is worth showing rather than picking a single hero.
 */
const ALT_KIND: Record<'de' | 'en', Record<PlacementKind, string>> = {
  de: { scaffolding: 'Gerüstwerbung', facade: 'Fassadenwerbung', digital: 'Digitaler Screen' },
  en: { scaffolding: 'Scaffolding advertising', facade: 'Facade advertising', digital: 'Digital screen' },
};

export function PlacementMedia({
  placement: p,
  num,
  statusLabel,
  kind,
}: {
  placement: Placement;
  num: string;
  statusLabel: string;
  /** Puts the format in the alt text: "Gerüstwerbung am Riehenring 141, …". */
  kind?: PlacementKind;
}) {
  const locale = useLocale();
  const copy = COPY[locale === 'en' ? 'en' : 'de'];
  const alt = kind ? `${ALT_KIND[locale === 'en' ? 'en' : 'de'][kind]} ${locale === 'en' ? 'at' : 'am'} ${placeLabel(p)}` : p.name;
  const shots = p.images?.length ? p.images : p.image ? [p.image] : [];
  const [active, setActive] = useState(0);
  const current = shots[active] ?? p.image;

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-fog border border-rule">
        {/* A placement can go live before its photos arrive. */}
        {current && (
          <Image
            src={current}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        )}
        <StatusBadge status={p.status} label={statusLabel} />
        <div className="absolute top-5 right-5 font-ui font-semibold text-[11px] tracking-[0.22em] text-white bg-dusk/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          № {num}
        </div>
      </div>

      {shots.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={copy.photo(p.name, i + 1, shots.length)}
              aria-current={i === active}
              className={`relative h-16 w-24 rounded-[10px] overflow-hidden border-2 transition-all ${
                i === active ? 'border-mid' : 'border-rule hover:border-mid/50'
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** "Kampagnen hier: Grand Casino Basel" — turns a placement into proof-of-work. */
export function CaseLinks({ placement, locale }: { placement: Placement; locale: string }) {
  const cases = getCasesForPlacement(placement);
  const brands = placement.brands ?? [];
  if (cases.length === 0 && brands.length === 0) return null;
  const copy = COPY[locale === 'en' ? 'en' : 'de'];

  return (
    <div className="mb-7 pt-5 border-t border-rule">
      <div className="font-ui font-semibold text-[9.5px] tracking-[0.22em] uppercase text-muted mb-3">
        {copy.campaignsHere}
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Advertisers without a published case — credited, not linked. */}
        {brands.map((b) => (
          <span
            key={b}
            className="inline-flex items-center border border-rule rounded-full px-3.5 py-1.5 bg-white font-ui font-semibold text-[11px] tracking-[0.1em] uppercase text-ink-soft"
          >
            {b}
          </span>
        ))}
        {cases.map((c) => (
          <Link
            key={c.slug}
            href={`/${locale}/cases/${c.slug}`}
            className="group inline-flex items-center gap-2 border border-rule rounded-full pl-1.5 pr-3.5 py-1.5 bg-white hover:border-mid hover:-translate-y-0.5 transition-all"
          >
            {c.images?.[0] && (
              <span className="relative h-6 w-6 rounded-full overflow-hidden bg-fog shrink-0">
                <Image src={c.images[0]} alt="" fill sizes="24px" className="object-cover" />
              </span>
            )}
            <span className="font-ui font-semibold text-[11px] tracking-[0.1em] uppercase text-ink-soft group-hover:text-ink transition-colors">
              {c.brand}
            </span>
            <span className="text-mid text-[11px] transition-transform group-hover:translate-x-0.5">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function PlacementShowcase({ kind, namespace, eyebrow, stripWeekPrefix = false, children }: Props) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const copy = COPY[locale === 'en' ? 'en' : 'de'];

  const current = getCurrentPlacements(kind);
  const past = getPastPlacements(kind);

  const statusLabel = (s: Placement['status']) =>
    s === 'past' ? t('status.past') : s === 'booked' ? t('status.booked') : t('status.available');

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">
              § {eyebrow}
            </span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title')}
            </h1>
            <p
              className="font-body text-white/85 max-w-3xl mx-auto m-0"
              style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}
            >
              {t('description')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── CURRENT PLACEMENTS — alternating photo/text rows ── */}
      <section className="py-20">
        <div className="shell flex flex-col gap-16 md:gap-24">
          {current.map((raw, i) => {
            // Display text is localized; traffic parsing stays on the original.
            const p = localizePlacement(raw, locale);
            const reverse = i % 2 === 1;
            const num = String(i + 1).padStart(2, '0');
            const isWeekly = /ugent|weekly|wöch/i.test(raw.traffic);
            const trafficKey = isWeekly ? 'details.trafficWeekly' : 'details.trafficDaily';
            const durationValue = stripWeekPrefix
              ? locale === 'en'
                ? p.duration.replace(/^CW /, '')
                : p.duration.replace('KW ', '')
              : p.duration;
            return (
              <div
                key={p.id}
                id={p.id}
                className={`grid lg:grid-cols-[1.1fr_1fr] grid-cols-1 gap-10 md:gap-14 items-center scroll-mt-24 ${reverse ? 'lg:[grid-template-columns:1fr_1.1fr]' : ''}`}
              >
                {/* Image */}
                <div className={reverse ? 'lg:order-2' : ''}>
                  <PlacementMedia
                    kind={kind}
                    placement={p}
                    num={num}
                    statusLabel={statusLabel(p.status)}
                  />
                </div>

                {/* Content */}
                <div className={reverse ? 'lg:order-1' : ''}>
                  <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted mb-3">
                    {p.address}
                  </div>
                  <h2
                    className="font-display font-normal m-0 mb-5 text-ink"
                    style={{ fontSize: 'clamp(32px, 3.6vw, 56px)', letterSpacing: '-0.025em', lineHeight: 0.98 }}
                  >
                    {p.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="italic text-mid">{p.name.split(' ').slice(-1).join(' ')}</span>
                  </h2>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 border-t border-rule mb-6">
                    {[
                      { v: p.size, k: t('details.size') ?? 'Grösse' },
                      { v: p.traffic.split(' ')[0], k: t(trafficKey) },
                      { v: durationValue, k: t('details.duration') ?? 'Zeitraum' },
                    ].map((s, j) => (
                      <div key={j} className={`py-4 border-b border-rule ${j < 2 ? 'pr-3 border-r' : ''} ${j > 0 ? 'pl-3' : ''}`}>
                        <div className="font-display font-normal text-ink" style={{ fontSize: 'clamp(20px, 2.3vw, 30px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                          {s.v}
                        </div>
                        <div className="font-ui font-semibold text-[9.5px] tracking-[0.18em] uppercase text-muted mt-1.5">
                          {s.k}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="m-0 mb-7 p-0 list-none flex flex-col gap-2.5">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex gap-3 items-start text-[15px] leading-[1.55] text-ink-soft">
                        <span aria-hidden className="font-display italic text-mid text-[16px] leading-[1.3] shrink-0">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <CaseLinks placement={p} locale={locale} />

                  <Link
                    href={`/${locale}/contact?location=${encodeURIComponent(raw.name)}`}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
                  >
                    {t('details.contactButton')}
                    <span>↗</span>
                  </Link>
                  <Link
                    href={`/${locale}${placementPath(raw)}`}
                    className="ml-5 inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.16em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
                  >
                    {copy.details} <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ARCHIVE — retired placements, kept as proof-of-work ── */}
      {past.length > 0 && (
        <section className="py-20 border-t border-rule">
          <div className="shell">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-2xl">
                <span className="sec-no inline-block mb-4 text-mid">§ {t('archive.eyebrow')}</span>
                <h2
                  className="font-display font-normal m-0 mb-4 text-ink"
                  style={{ fontSize: 'clamp(28px, 3.6vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.03 }}
                >
                  {t('archive.title')}
                </h2>
                <p className="text-[15px] leading-[1.65] text-ink-soft m-0">{t('archive.description')}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {past.map((raw) => {
                const p = localizePlacement(raw, locale);
                const cases = getCasesForPlacement(p);
                return (
                  <div
                    key={p.id}
                    id={p.id}
                    className="bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col scroll-mt-24"
                  >
                    <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                      <Image
                        src={p.image}
                        alt={`${ALT_KIND[locale === 'en' ? 'en' : 'de'][kind]} ${locale === 'en' ? 'at' : 'am'} ${placeLabel(p)}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        style={{ filter: 'saturate(0.75)' }}
                      />
                      <StatusBadge status="past" label={statusLabel('past')} />
                    </div>
                    <div className="p-6 flex flex-col gap-2.5 flex-1">
                      <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">
                        {p.address}
                      </div>
                      <h3
                        className="font-display font-normal m-0 text-ink"
                        style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.1 }}
                      >
                        {p.name}
                      </h3>
                      <p className="text-[13.5px] leading-[1.55] text-ink-soft m-0">
                        {p.traffic} · {p.size}
                      </p>
                      {(cases.length > 0 || (p.brands ?? []).length > 0) && (
                        <div className="mt-auto pt-4 border-t border-rule flex flex-wrap gap-x-3 gap-y-2">
                          {cases.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/${locale}/cases/${c.slug}`}
                              className="font-ui font-semibold text-[10.5px] tracking-[0.16em] uppercase text-ink-soft hover:text-mid transition-colors"
                            >
                              {c.brand} ↗
                            </Link>
                          ))}
                          {(p.brands ?? []).map((b) => (
                            <span
                              key={b}
                              className="font-ui font-semibold text-[10.5px] tracking-[0.16em] uppercase text-muted"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {children}

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-32 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
            backgroundSize: '120px 80px',
          }}
        />
        <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-12 items-center">
          <div>
            <h2
              className="font-display font-normal m-0 text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
            >
              {t('cta.title')}
            </h2>
            <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
              {t('cta.description')}
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <Link
              href={`/${locale}/contact`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="flex items-center gap-4">
                <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-white/65">{copy.book}</span>
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>
                  {t('cta.button')}
                </span>
              </span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
            <a
              href="tel:+41772338121"
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="flex items-center gap-4">
                <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-white/65">{copy.call}</span>
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>
                  {copy.phone}
                </span>
              </span>
              <span className="text-glow text-[20px]">↗</span>
            </a>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
