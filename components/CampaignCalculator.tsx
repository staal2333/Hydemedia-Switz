'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  PLACEMENT_KINDS,
  getCurrentPlacements,
  localizePlacement,
  placementPath,
  placementSlug,
  type Placement,
  type PlacementKind,
} from '@/lib/placements';
import { track } from '@/lib/track';

const COPY = {
  de: {
    pick: 'Standorte wählen',
    weeks: 'Kampagnendauer',
    week: (n: number) => (n === 1 ? '1 Woche' : `${n} Wochen`),
    summary: 'Ihre Kampagne',
    exposures: 'Geschätzte Kontakte',
    perWeek: 'pro Woche',
    placements: 'Standorte',
    area: 'Gesamte Bannerfläche',
    none: 'Wählen Sie mindestens einen Standort, um die Reichweite zu sehen.',
    send: 'Angebot für diesen Plan anfordern',
    copy: 'Link zum Plan kopieren',
    copied: 'Link kopiert',
    view: 'Standort ansehen',
    booked: 'Gebucht',
    kind: { scaffolding: 'Gerüst', facade: 'Fassade', digital: 'Digitaler Screen' } as Record<PlacementKind, string>,
    daily: 'pro Tag',
    note: 'Die Zahlen sind Bruttokontakte auf Basis der Verkehrszahlen der Standorte: Jede Passage zählt, auch wenn dieselbe Person mehrmals vorbeikommt. Nutzen Sie die Zahlen, um Pläne zu vergleichen, nicht als Garantie.',
    weeksLabel: (n: number) => `${n} Wochen`,
  },
  en: {
    pick: 'Choose placements',
    weeks: 'Campaign period',
    week: (n: number) => (n === 1 ? '1 week' : `${n} weeks`),
    summary: 'Your campaign',
    exposures: 'Estimated contacts',
    perWeek: 'per week',
    placements: 'Placements',
    area: 'Total banner area',
    none: 'Choose at least one placement to see the reach.',
    send: 'Get a quote for this plan',
    copy: 'Copy link to plan',
    copied: 'Link copied',
    view: 'View site',
    booked: 'Booked',
    kind: { scaffolding: 'Scaffolding', facade: 'Facade', digital: 'Digital screen' } as Record<PlacementKind, string>,
    daily: 'daily',
    note: 'Figures are gross contacts based on each site’s traffic: every pass counts, also when the same person passes several times. Use the figures to compare plans, not as a guarantee.',
    weeksLabel: (n: number) => `${n} weeks`,
  },
};

type Item = { p: Placement; kind: PlacementKind; slug: string; dailyImpressions: number };

/** Daily impressions for a site: traffic per day, or a digital screen's share of plays. */
function dailyImpressions(p: Placement): number {
  if (p.digital?.impressions) {
    const weekly = Number(p.digital.impressions.replace(/[^\d]/g, '')) || 0;
    return weekly / 7;
  }
  const n = Number(p.traffic.split(' ')[0].replace(/['’.,]/g, '')) || 0;
  return /wöch|week/i.test(p.traffic) ? n / 7 : n;
}

const MAX_WEEKS = 26;

/**
 * Reach calculator: pick live placements and a period, see the estimated
 * impressions, then share the plan as a link or send it as an enquiry. The
 * plan lives in the URL (?p=slug,slug&u=weeks), so a link opens the same plan.
 */
export default function CampaignCalculator() {
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'de';
  const t = COPY[lang];
  const nf = useMemo(() => new Intl.NumberFormat(lang === 'de' ? 'de-CH' : 'en-GB'), [lang]);

  const items: Item[] = useMemo(
    () =>
      PLACEMENT_KINDS.flatMap((kind) =>
        getCurrentPlacements(kind).map((raw) => ({
          p: localizePlacement(raw, locale),
          kind,
          slug: placementSlug(raw),
          dailyImpressions: dailyImpressions(raw),
        })),
      ).sort((a, b) => Number(Boolean(b.p.flagship)) - Number(Boolean(a.p.flagship)) || Number(Boolean(b.p.image)) - Number(Boolean(a.p.image))),
    [locale],
  );

  const [selected, setSelected] = useState<Set<string>>(() => new Set(items.filter((i) => i.p.flagship).map((i) => i.slug)));
  const [weeks, setWeeks] = useState(4);
  const [copied, setCopied] = useState(false);

  // Open a shared plan from the URL.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get('p');
    const u = Number(q.get('u'));
    if (p) setSelected(new Set(p.split(',').filter((s) => items.some((i) => i.slug === s))));
    if (u >= 1 && u <= MAX_WEEKS) setWeeks(u);
  }, [items]);

  const chosen = items.filter((i) => selected.has(i.slug));
  const weekly = chosen.reduce((sum, i) => sum + i.dailyImpressions * 7, 0);
  const total = weekly * weeks;
  const area = chosen.reduce((sum, i) => sum + (i.p.dimensions.width > 1 ? i.p.dimensions.width : 0), 0);

  const toggle = (slug: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const planUrl = () => {
    const u = new URL(window.location.href);
    u.search = '';
    if (chosen.length) u.searchParams.set('p', chosen.map((i) => i.slug).join(','));
    u.searchParams.set('u', String(weeks));
    return u.toString();
  };

  const copyLink = async () => {
    const url = planUrl();
    window.history.replaceState(null, '', url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked; the address bar now holds the plan */
    }
    track('calculator_share', { placements: chosen.length, weeks });
  };

  const topic = `${chosen.map((i) => i.p.name).join(', ')} (${t.weeksLabel(weeks)})`.slice(0, 118);
  const contactHref = `/${lang}/contact?location=${encodeURIComponent(topic)}`;

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] grid-cols-1 gap-8 items-start">
      <div>
        <h2 className="font-display font-normal text-ink m-0 mb-5" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', letterSpacing: '-0.025em' }}>
          {t.pick}
        </h2>
        <ul className="m-0 p-0 list-none grid sm:grid-cols-2 grid-cols-1 gap-4">
          {items.map((i) => {
            const on = selected.has(i.slug);
            return (
              <li key={i.slug}>
                <label
                  className={`block cursor-pointer bg-white rounded-[18px] overflow-hidden border-2 transition-all focus-within:ring-2 focus-within:ring-mid focus-within:ring-offset-2 ${
                    on ? 'border-mid shadow-[0_8px_24px_rgba(74,123,181,0.25)]' : 'border-rule hover:border-mid/50'
                  }`}
                >
                  <div className="relative aspect-[16/9] bg-fog">
                    {(i.p.video?.poster ?? i.p.image) && (
                      <Image src={i.p.video?.poster ?? i.p.image} alt="" fill sizes="(max-width: 640px) 100vw, 30vw" className="object-cover" />
                    )}
                    {i.p.status === 'booked' && (
                      <span className="absolute top-3 left-3 bg-white/90 text-dusk font-ui font-bold text-[9.5px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full">
                        {t.booked}
                      </span>
                    )}
                    <span
                      className={`absolute top-3 right-3 h-7 w-7 rounded-full grid place-items-center text-[14px] font-bold ${
                        on ? 'bg-mid text-white' : 'bg-white/90 text-transparent border border-rule'
                      }`}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </div>
                  <div className="p-4">
                    <input type="checkbox" checked={on} onChange={() => toggle(i.slug)} className="sr-only" />
                    <div className="font-ui font-semibold text-[10px] tracking-[0.2em] uppercase text-muted mb-1">
                      {t.kind[i.kind]} · {i.p.location}
                    </div>
                    <div className="font-display text-ink text-[19px] leading-tight" style={{ letterSpacing: '-0.015em' }}>{i.p.name}</div>
                    <div className="text-[13px] text-ink-soft mt-1">
                      {nf.format(Math.round(i.dailyImpressions))} {t.daily}
                      {i.p.dimensions.width > 1 ? ` · ${i.p.size}` : ''}
                    </div>
                  </div>
                </label>
                <Link href={`/${lang}${placementPath(i.p)}`} className="inline-block mt-1.5 ml-1 font-ui font-semibold text-[10.5px] uppercase tracking-[0.14em] text-ink-soft hover:text-mid">
                  {t.view} →
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-28 bg-ink text-white rounded-[24px] p-7 md:p-8">
        <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-sky mb-5">{t.summary}</div>

        <label className="block mb-6">
          <span className="flex justify-between items-baseline font-ui text-[12px] uppercase tracking-[0.14em] text-white/70 mb-3">
            {t.weeks}
            <span className="font-display normal-case tracking-normal text-[22px] text-white">{t.week(weeks)}</span>
          </span>
          <input
            type="range"
            min={1}
            max={MAX_WEEKS}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="w-full accent-[#ffecc8]"
          />
        </label>

        {chosen.length === 0 ? (
          <p className="text-white/75 text-[15px] m-0 mb-6">{t.none}</p>
        ) : (
          <dl className="m-0 mb-6 grid grid-cols-2 gap-x-4 gap-y-5">
            <div className="col-span-2">
              <dt className="font-ui text-[10px] uppercase tracking-[0.2em] text-white/60">{t.exposures}</dt>
              <dd className="m-0 font-display text-glow" style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {nf.format(Math.round(total / 1000) * 1000)}
              </dd>
              <dd className="m-0 text-white/60 text-[13px] mt-1">{nf.format(Math.round(weekly / 100) * 100)} {t.perWeek}</dd>
            </div>
            <div>
              <dt className="font-ui text-[10px] uppercase tracking-[0.2em] text-white/60">{t.placements}</dt>
              <dd className="m-0 font-display text-[26px]">{chosen.length}</dd>
            </div>
            <div>
              <dt className="font-ui text-[10px] uppercase tracking-[0.2em] text-white/60">{t.area}</dt>
              <dd className="m-0 font-display text-[26px]">{area > 0 ? `${nf.format(area)} m²` : '—'}</dd>
            </div>
          </dl>
        )}

        <div className="flex flex-col gap-2.5">
          <Link
            href={chosen.length ? contactHref : `/${lang}/contact`}
            onClick={() => track('calculator_send', { placements: chosen.length, weeks })}
            className="text-center px-6 py-4 rounded-full bg-cream text-dusk font-ui font-semibold text-[12px] uppercase tracking-[0.1em] hover:bg-glow transition-colors"
          >
            {t.send} ↗
          </Link>
          <button
            type="button"
            onClick={copyLink}
            disabled={chosen.length === 0}
            className="px-6 py-3.5 rounded-full border border-white/30 text-white font-ui font-semibold text-[11px] uppercase tracking-[0.1em] hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <p className="text-white/55 text-[12px] leading-[1.6] mt-6 mb-0">{t.note}</p>
      </aside>
    </div>
  );
}
