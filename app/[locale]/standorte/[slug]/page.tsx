import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import {
  PLACEMENT_KINDS,
  getPlacements,
  getCurrentPlacements,
  getPlacementBySlug,
  localizePlacement,
  placementPath,
  placementSlug,
  type Placement,
  type PlacementKind,
} from '@/lib/placements';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import { PlacementMedia, CaseLinks } from '@/components/blue-hour/PlacementShowcase';
import NewsletterSignup from '@/components/NewsletterSignup';

const SITE = 'https://www.hydemedia.ch';

/** Section page each kind belongs to. */
const KIND_PATH: Record<PlacementKind, string> = {
  scaffolding: '/scaffolding',
  facade: '/facade',
  digital: '/digital',
};

const COPY = {
  de: {
    home: 'Startseite',
    kind: { scaffolding: 'Gerüstwerbung', facade: 'Fassadenwerbung', digital: 'Digitaler Screen' },
    at: 'am',
    status: { available: 'Verfügbar', booked: 'Gebucht', past: 'Beendet' },
    size: 'Grösse',
    traffic: 'Kontakte',
    daily: 'pro Tag',
    weekly: 'pro Woche',
    period: 'Zeitraum',
    facts: 'Kennzahlen',
    address: 'Adresse',
    format: 'Format',
    price: 'Preis',
    priceValue: {
      scaffolding: 'Auf Anfrage, inkl. Druck, Montage und Bewilligung',
      facade: 'Auf Anfrage, inkl. Druck und Montage',
      digital: 'Auf Anfrage',
    },
    inquire: (name: string) => `${name} anfragen`,
    call: 'Anrufen: +41 77 233 81 21',
    answer: 'Antwort innerhalb von 24 Stunden an Werktagen.',
    calc: 'Reichweite berechnen',
    whyTitle: 'Warum dieser Standort',
    pastNote: 'Dieser Standort ist beendet und nicht mehr buchbar. Sehen Sie die aktuellen Standorte.',
    seeLive: 'Aktuelle Standorte ansehen',
    nlTitle: (past: boolean) => (past ? 'Über neue Standorte informiert werden' : 'Passt der Zeitraum nicht?'),
    nlBody: 'Erhalten Sie eine kurze E-Mail, sobald die nächste Fläche frei wird. Abmeldung mit einem Klick.',
    moreTitle: 'Weitere Standorte',
    allOfKind: (k: string) => `Alle Standorte: ${k}`,
    lede: (p: Placement, kindLabel: string) =>
      p.digital
        ? `Digitaler Screen auf Augenhöhe an der ${p.address}. ${p.traffic}. Share of Voice: ${p.digital.shareOfVoice}.`
        : `${p.size} ${kindLabel} an der Adresse ${p.address}. ${p.traffic}. Zeitraum: ${p.duration}.`,
    sov: 'Share of Voice',
    onAir: 'Sendezeit',
    formats: 'Formate',
  },
  en: {
    home: 'Home',
    kind: { scaffolding: 'Scaffolding advertising', facade: 'Facade advertising', digital: 'Digital screen' },
    at: 'at',
    status: { available: 'Available', booked: 'Booked', past: 'Ended' },
    size: 'Size',
    traffic: 'Passers-by',
    daily: 'daily',
    weekly: 'weekly',
    period: 'Period',
    facts: 'Key facts',
    address: 'Address',
    format: 'Format',
    price: 'Price',
    priceValue: {
      scaffolding: 'On request, including print, installation and permit',
      facade: 'On request, including print and installation',
      digital: 'On request. You supply the files, we put them in rotation',
    },
    inquire: (name: string) => `Enquire about ${name}`,
    call: 'Call +41 77 233 81 21',
    answer: 'Reply within 24 hours on weekdays.',
    calc: 'Calculate the reach',
    whyTitle: 'Why this placement',
    pastNote: 'This placement has ended and cannot be booked. See the placements available now.',
    seeLive: 'See available placements',
    nlTitle: (past: boolean) => (past ? 'Hear about new placements' : 'Timing not right?'),
    nlBody: 'Get a short email when the next site becomes available. Unsubscribe in one click.',
    moreTitle: 'Other available placements',
    allOfKind: (k: string) => `All placements: ${k.toLowerCase()}`,
    lede: (p: Placement, kindLabel: string) =>
      p.digital
        ? `Eye-level digital screen at ${p.address}. ${p.traffic}. Share of voice: ${p.digital.shareOfVoice.toLowerCase()}.`
        : `${p.size} of ${kindLabel.toLowerCase()} at ${p.address}. ${p.traffic}. Period: ${p.duration}.`,
    sov: 'Share of voice',
    onAir: 'On air',
    formats: 'Formats',
  },
} as const;

type Copy = (typeof COPY)['de'] | (typeof COPY)['en'];

function copyFor(locale: string): Copy {
  return COPY[locale === 'en' ? 'en' : 'de'];
}

/** "Kleinbasel, Basel" → "Basel"; "Basel" stays as it is. */
function cityOf(location: string): string {
  return location.split(',').pop()!.trim();
}

function headline(p: Placement, kind: PlacementKind, t: Copy): string {
  return `${t.kind[kind]} ${t.at} ${p.name}`;
}

export function generateStaticParams() {
  return ['de', 'en'].flatMap((locale) =>
    PLACEMENT_KINDS.flatMap((kind) => getPlacements(kind).map((p) => ({ locale, slug: placementSlug(p) }))),
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const found = getPlacementBySlug(slug);
  // A real 404; returning metadata here let the page stream a 200 first.
  if (!found) notFound();
  const t = copyFor(locale);
  const p = localizePlacement(found.placement, locale);
  const base = headline(p, found.kind, t);
  const withCity = `${base}, ${cityOf(p.location)}`;
  const meta = generateSEOMetadata({
    // Keep the city when the full title still fits a search result.
    title: withCity.length <= 47 ? withCity : base,
    description: t.lede(p, t.kind[found.kind]).slice(0, 158),
    keywords: [t.kind[found.kind], p.name, p.location, 'outdoor', 'OOH'].join(', '),
    path: placementPath(p),
    locale,
    image: p.image,
  });
  // A retired placement stays reachable for old links, but is not offered to search.
  return p.status === 'past' ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default function PlacementPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const found = getPlacementBySlug(slug);
  if (!found) notFound();

  const { kind } = found;
  const t = copyFor(locale);
  const p = localizePlacement(found.placement, locale);
  const kindLabel = t.kind[kind];
  const title = headline(p, kind, t);
  const isPast = p.status === 'past';
  const weekly = /wöch|week/i.test(found.placement.traffic);
  const url = `${SITE}/${locale}${placementPath(p)}`;

  const others = PLACEMENT_KINDS.flatMap((k) =>
    getCurrentPlacements(k).map((o) => ({ o: localizePlacement(o, locale), k })),
  )
    .filter(({ o }) => o.id !== p.id)
    .sort((a, b) => Number(Boolean(b.o.flagship)) - Number(Boolean(a.o.flagship)))
    .slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE}/${locale}` },
        { '@type': 'ListItem', position: 2, name: kindLabel, item: `${SITE}/${locale}${KIND_PATH[kind]}` },
        { '@type': 'ListItem', position: 3, name: p.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      serviceType: kindLabel,
      url,
      ...(p.image ? { image: `${SITE}${p.image}` } : {}),
      description: t.lede(p, kindLabel),
      provider: { '@id': `${SITE}/#organization`, '@type': 'Organization', name: 'Hyde Media' },
      areaServed: {
        '@type': 'Place',
        name: p.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: p.address,
          addressLocality: cityOf(p.location),
          addressCountry: 'CH',
        },
      },
      additionalProperty: [
        ...(p.digital ? [] : [{ '@type': 'PropertyValue', name: t.size, value: p.size }]),
        { '@type': 'PropertyValue', name: t.traffic, value: p.traffic },
        { '@type': 'PropertyValue', name: t.period, value: p.duration },
        { '@type': 'PropertyValue', name: 'Status', value: t.status[p.status] },
      ],
    },
  ];

  const contactHref = `/${locale}/contact?location=${encodeURIComponent(found.placement.name)}`;

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <nav aria-label="Breadcrumb" className="font-ui font-medium text-[11px] tracking-[0.24em] uppercase text-white/65 mb-6">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.home}</Link>
              <span className="mx-2.5">/</span>
              <Link href={`/${locale}${KIND_PATH[kind]}`} className="hover:text-white transition-colors">{kindLabel}</Link>
              <span className="mx-2.5">/</span>
              <span className="text-white/90">{p.name}</span>
            </nav>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(38px, 5.6vw, 88px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {kindLabel} {t.at} <span className="italic text-cream">{p.name}</span>
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t.lede(p, kindLabel)}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-20">
          <div className="shell grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-10 lg:gap-14 items-start">
            <PlacementMedia placement={p} kind={kind} num="001" statusLabel={t.status[p.status]} />

            <div>
              <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted mb-3">{p.address}</div>

              <div className="grid grid-cols-3 border-t border-rule mb-7">
                {[
                  p.digital ? { v: p.digital.shareOfVoice, k: t.sov } : { v: p.size, k: t.size },
                  { v: p.traffic.split(' ')[0], k: `${t.traffic} ${weekly ? t.weekly : t.daily}` },
                  { v: p.duration, k: t.period },
                ].map((s, j) => (
                  <div key={j} className={`py-4 border-b border-rule ${j < 2 ? 'pr-3 border-r' : ''} ${j > 0 ? 'pl-3' : ''}`}>
                    <div className="font-display font-normal text-ink" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                      {s.v}
                    </div>
                    <div className="font-ui font-semibold text-[9.5px] tracking-[0.18em] uppercase text-muted mt-1.5">{s.k}</div>
                  </div>
                ))}
              </div>

              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 26, letterSpacing: '-0.02em' }}>
                {t.whyTitle}
              </h2>
              <ul className="m-0 mb-7 p-0 list-none flex flex-col gap-2.5">
                {p.features.map((f, j) => (
                  <li key={j} className="flex gap-3 items-start text-[15px] leading-[1.55] text-ink-soft">
                    <span aria-hidden className="font-display italic text-mid text-[16px] leading-[1.3] shrink-0">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <CaseLinks placement={p} locale={locale} />

              {isPast ? (
                <div className="bg-white border border-rule rounded-2xl p-6">
                  <p className="text-[15px] leading-[1.6] text-ink-soft m-0 mb-4">{t.pastNote}</p>
                  <Link
                    href={`/${locale}${KIND_PATH[kind]}`}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
                  >
                    {t.seeLive} <span>→</span>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2.5">
                    <Link
                      href={contactHref}
                      className="inline-flex items-center gap-3 px-6 py-4 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
                    >
                      {t.inquire(p.name)} <span>↗</span>
                    </Link>
                    <a
                      href="tel:+41772338121"
                      className="inline-flex items-center gap-2.5 px-6 py-4 border border-rule bg-white text-ink rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:border-mid transition-all"
                    >
                      {t.call}
                    </a>
                  </div>
                  <p className="text-[13px] text-muted m-0">
                    {t.answer}{' '}
                    <Link href={`/${locale}/kampagnenrechner?p=${slug}`} className="text-mid underline underline-offset-2 hover:text-ink">
                      {t.calc} →
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Plain facts, in one place — what an assistant or a buyer quotes. */}
        <section className="pb-20">
          <div className="shell max-w-4xl">
            <h2 className="font-display font-normal text-ink m-0 mb-6" style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.025em' }}>
              {t.facts}
            </h2>
            <dl className="grid sm:grid-cols-2 grid-cols-1 border-t border-rule m-0">
              {[
                [t.address, p.address],
                [t.format, kindLabel],
                ...(p.digital
                  ? [
                      [t.sov, p.digital.shareOfVoice],
                      [t.onAir, p.digital.onAir],
                      [t.formats, p.digital.formats],
                    ]
                  : [[t.size, p.size]]),
                [t.traffic, p.traffic],
                [t.period, p.duration],
                ['Status', t.status[p.status]],
                [t.price, t.priceValue[kind]],
              ].map(([k, v]) => (
                <div key={k} className="py-4 border-b border-rule sm:pr-6">
                  <dt className="font-ui font-semibold text-[10px] tracking-[0.2em] uppercase text-muted mb-1">{k}</dt>
                  <dd className="m-0 text-[16px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="pb-20 print:hidden">
          <div className="shell max-w-5xl">
            <div className="bg-white border border-rule rounded-[24px] p-7 md:p-10">
              <NewsletterSignup source={`placement:${slug}`} title={t.nlTitle(isPast)} body={t.nlBody} />
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="pb-28">
            <div className="shell">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.025em' }}>
                  {t.moreTitle}
                </h2>
                <Link
                  href={`/${locale}${KIND_PATH[kind]}`}
                  className="font-ui font-semibold text-[11px] uppercase tracking-[0.16em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
                >
                  {t.allOfKind(kindLabel)} →
                </Link>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {others.map(({ o, k }) => (
                  <Link
                    key={o.id}
                    href={`/${locale}${placementPath(o)}`}
                    className="group bg-white border border-rule rounded-[20px] overflow-hidden hover:-translate-y-1 hover:border-mid transition-all"
                  >
                    <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                      {(o.video?.poster ?? o.image) && (
                        <Image
                          src={o.video?.poster ?? o.image}
                          alt={`${t.kind[k]} ${t.at} ${o.name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted mb-2">
                        {t.kind[k]} · {o.location}
                      </div>
                      <div className="font-display text-ink text-[22px] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                        {o.name}
                      </div>
                      <div className="text-[13.5px] text-ink-soft mt-1.5">
                        {o.size} · {o.traffic}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </GroundFlow>
    </div>
  );
}
