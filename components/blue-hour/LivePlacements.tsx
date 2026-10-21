'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  PLACEMENT_KINDS,
  getCurrentPlacements,
  localizePlacement,
  placementPath,
  type PlacementKind,
} from '@/lib/placements';

const COPY = {
  de: {
    eyebrow: 'Freie Standorte',
    title: 'Jetzt buchbar',
    all: 'Alle Standorte ansehen',
    kind: { scaffolding: 'Gerüst', facade: 'Fassade', digital: 'Digitaler Screen' },
  },
  en: {
    eyebrow: 'Available placements',
    title: 'Ready to book now',
    all: 'See all locations',
    kind: { scaffolding: 'Scaffolding', facade: 'Facade', digital: 'Digital screen' },
  },
} as const;

/**
 * Three live placements, flagship first. Sits under articles so a reader who
 * has just learned about a format can go straight to a place that is for sale.
 */
export default function LivePlacements() {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const items = PLACEMENT_KINDS.flatMap((k) =>
    getCurrentPlacements(k)
      .filter((p) => p.status === 'available')
      .map((p) => ({ p: localizePlacement(p, locale), k: k as PlacementKind })),
  )
    .sort((a, b) => Number(Boolean(b.p.flagship)) - Number(Boolean(a.p.flagship)))
    .slice(0, 3);
  if (items.length === 0) return null;


  return (
    <section className="py-20 print:hidden">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="sec-no inline-block mb-3 text-mid">§ {t.eyebrow}</span>
            <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/standorte`}
            className="font-ui font-semibold text-[11px] uppercase tracking-[0.16em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
          >
            {t.all} →
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {items.map(({ p, k }) => (
            <Link
              key={p.id}
              href={`/${locale}${placementPath(p)}`}
              className="group bg-white border border-rule rounded-[20px] overflow-hidden hover:-translate-y-1 hover:border-mid transition-all"
            >
              <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                {(p.video?.poster ?? p.image) && (
                  <Image
                    src={p.video?.poster ?? p.image}
                    alt={`${t.kind[k]} · ${p.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted mb-2">
                  {t.kind[k]} · {p.location}
                </div>
                <div className="font-display text-ink text-[22px] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  {p.name}
                </div>
                <div className="text-[13.5px] text-ink-soft mt-1.5">
                  {p.size} · {p.traffic}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
