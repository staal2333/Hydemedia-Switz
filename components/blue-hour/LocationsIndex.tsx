'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PLACEMENT_KINDS,
  getCurrentPlacements,
  localizePlacement,
  placementPath,
  type Placement,
  type PlacementKind,
} from '@/lib/placements';

const COPY = {
  de: {
    all: 'Alle',
    kind: { scaffolding: 'Gerüst', facade: 'Fassade', digital: 'Digitaler Screen' },
    filter: 'Nach Format filtern',
    count: (n: number) => (n === 1 ? '1 Standort' : `${n} Standorte`),
    flagship: 'Flagship',
    isNew: 'Neu',
    booked: 'Gebucht',
    see: 'Standort ansehen',
    period: 'Zeitraum',
    none: 'Derzeit keine Standorte in diesem Format.',
  },
  en: {
    all: 'All',
    kind: { scaffolding: 'Scaffolding', facade: 'Facade', digital: 'Digital screen' },
    filter: 'Filter by format',
    count: (n: number) => (n === 1 ? '1 site' : `${n} sites`),
    flagship: 'Flagship',
    isNew: 'New',
    booked: 'Booked',
    see: 'See the site',
    period: 'Period',
    none: 'No sites in this format right now.',
  },
} as const;

type Item = { p: Placement; k: PlacementKind };

/**
 * Every live placement, grouped by city, with a format filter. Flagship
 * first, then the order in placements.json.
 */
export default function LocationsIndex({ locale }: { locale: string }) {
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const [kind, setKind] = useState<PlacementKind | 'all'>('all');

  const items: Item[] = PLACEMENT_KINDS.flatMap((k) =>
    getCurrentPlacements(k).map((p) => ({ p: localizePlacement(p, locale), k })),
  ).sort((a, b) => Number(Boolean(b.p.flagship)) - Number(Boolean(a.p.flagship)));
  const shown = items.filter((i) => kind === 'all' || i.k === kind);

  // One group per city, in the order the cities first appear in the data.
  const cities = Array.from(new Set(shown.map((i) => i.p.location)));
  const groups = cities.map((city) => ({
    id: city.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: city,
    list: shown.filter((i) => i.p.location === city),
  }));

  const kinds: (PlacementKind | 'all')[] = ['all', ...PLACEMENT_KINDS.filter((k) => items.some((i) => i.k === k))];

  return (
    <div>
      <div role="group" aria-label={t.filter} className="flex flex-wrap gap-2 mb-12">
        {kinds.map((k) => {
          const n = k === 'all' ? items.length : items.filter((i) => i.k === k).length;
          const active = k === kind;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={active}
              onClick={() => setKind(k)}
              className={`px-4 py-2 rounded-full border font-ui font-semibold text-[11px] tracking-[0.1em] uppercase transition-colors ${active ? 'bg-ink text-white border-ink' : 'bg-white/80 text-ink-soft border-rule hover:border-mid hover:text-ink'}`}
            >
              {k === 'all' ? t.all : t.kind[k]} <span className={active ? 'text-white/60' : 'text-muted'}>· {n}</span>
            </button>
          );
        })}
      </div>

      {groups.length === 0 && <p className="text-ink-soft">{t.none}</p>}

      {groups.map((g) => (
        <section key={g.id} className="mb-16" aria-labelledby={`city-${g.id}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6 border-b border-rule pb-3">
            <h2 id={`city-${g.id}`} className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.025em' }}>
              {g.title}
            </h2>
            <span className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">{t.count(g.list.length)}</span>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {g.list.map(({ p, k }) => (
              <Link
                key={p.id}
                href={`/${locale}${placementPath(p)}`}
                className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1 hover:border-mid hover:shadow-[0_30px_60px_-24px_rgba(31,58,95,0.3)] transition-all"
              >
                <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                  {(p.video?.poster ?? p.image) && (
                    <Image
                      src={p.video?.poster ?? p.image}
                      alt={`${t.kind[k]} · ${p.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  {(p.flagship || p.isNew || p.status === 'booked') && (
                    <span className="absolute top-4 left-4 bg-glow text-dusk font-ui font-bold text-[9.5px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full">
                      {p.flagship ? t.flagship : p.status === 'booked' ? t.booked : t.isNew}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted mb-2">
                    {t.kind[k]} · {p.location}
                  </div>
                  <div className="font-display text-ink text-[22px] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                    {p.name}
                  </div>
                  <div className="text-[13.5px] text-ink-soft mt-1.5">
                    {k === 'digital' ? p.traffic : `${p.size} · ${p.traffic}`}
                  </div>
                  <div className="mt-auto pt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-ui font-semibold text-[10.5px] tracking-[0.14em] uppercase">
                    <span className="text-muted">{t.period}: <span className="text-ink-soft normal-case tracking-normal font-body font-normal text-[13px]">{p.duration}</span></span>
                    <span className="text-ink group-hover:text-mid transition-colors">{t.see} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
