import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { PLACEMENT_KINDS, getCurrentPlacements, localizePlacement, placementPath } from '@/lib/placements';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import LocationsIndex from '@/components/blue-hour/LocationsIndex';

const SITE = 'https://www.hydemedia.ch';

const COPY = {
  de: {
    title: 'Standorte für Gerüstwerbung und Fassadenwerbung in Basel',
    description: 'Alle Standorte von Hyde Media: Gerüst- und Fassadenflächen in Basel mit Grösse, Verkehrszahlen und Zeitraum. Für Aussenwerbung im Grossformat.',
    eyebrow: 'Standorte',
    h1a: 'Alle unsere ',
    h1b: 'Standorte.',
    lede: 'Gerüst- und Fassadenflächen an den verkehrsreichsten Orten der Schweiz. Wählen Sie einen Standort und sehen Sie Grösse, Verkehrszahlen und Zeitraum.',
    more: 'Siehe auch',
    links: [
      ['/de/geruestwerbung-basel', 'Gerüstwerbung in Basel'],
      ['/de/megaposter', 'Megaposter in Basel'],
      ['/de/scaffolding', 'Gerüstwerbung'],
      ['/de/facade', 'Fassadenwerbung'],
      ['/de/kampagnenrechner', 'Kampagnenrechner'],
    ],
    chooseEyebrow: 'Auswahl',
    chooseTitle: ['Wie Sie den richtigen ', 'Standort wählen.'],
    choose: [
      ['Verkehr und Wartezeit', 'Vergleichen Sie die Kontakte pro Tag, aber achten Sie auch darauf, wie lange Menschen den Standort sehen. An Ampeln, Tramhaltestellen und Kreuzungen bleibt der Blick länger auf dem Banner als an einer Strasse, auf der der Verkehr fliesst.'],
      ['Publikum', 'Ein Standort bei der Messe Basel erreicht andere Menschen als einer im Wohnquartier. Überlegen Sie, wer an der Fläche vorbeikommt: Pendler, Messebesucher, Anwohnerinnen oder Touristen.'],
      ['Zeitraum', 'Gerüstflächen gibt es nur, solange saniert wird. Prüfen Sie, ob der verfügbare Zeitraum zu Ihrer Kampagne passt; die Mindestbuchung beträgt 4 Wochen.'],
      ['Inhalt und Bewilligung', 'Die Reklamebewilligung kann Inhalte ausschliessen. Am Riehenring 141 ist zum Beispiel Werbung für Alkohol, Politik und pornografische Inhalte nicht erlaubt. Fragen Sie uns, bevor Sie das Sujet gestalten.'],
    ],
    stepsEyebrow: 'Ablauf',
    stepsTitle: ['Von der Anfrage ', 'zum Banner.'],
    steps: [
      ['Anfrage', 'Sie wählen einen Standort und schicken uns eine Anfrage. An Werktagen erhalten Sie innert 24 Stunden eine Offerte, die 30 Tage gültig ist.'],
      ['Buchung', 'Mit Ihrer Bestätigung reservieren wir den Standort. Die Offerte enthält Bewilligung, Druck, Montage und Demontage.'],
      ['Bewilligung und Druckdaten', 'Wir reichen das Bewilligungsgesuch ein. Sie liefern die Druckdaten spätestens 10 Arbeitstage vor Kampagnenstart.'],
      ['Montage und Laufzeit', 'Wir drucken und montieren das Banner und nehmen es nach der Kampagnenperiode wieder ab.'],
    ],
    stepsNote: ['Alle Bedingungen finden Sie in unseren ', 'AGB', '.'],
  },
  en: {
    title: 'Locations: scaffolding and facade advertising in Basel',
    description: 'All Hyde Media locations: scaffolding and facade sites in Basel with size, traffic figures and period. Large-format outdoor advertising in Switzerland.',
    eyebrow: 'Locations',
    h1a: 'All our ',
    h1b: 'locations.',
    lede: 'Scaffolding and facade sites at the busiest spots in Switzerland. Choose a site to see its size, traffic and period.',
    more: 'See also',
    links: [
      ['/en/geruestwerbung-basel', 'Scaffolding advertising in Basel'],
      ['/en/megaposter', 'Megaposters in Basel'],
      ['/en/scaffolding', 'Scaffolding advertising'],
      ['/en/facade', 'Facade advertising'],
      ['/en/kampagnenrechner', 'Campaign calculator'],
    ],
    chooseEyebrow: 'Choosing',
    chooseTitle: ['How to choose the right ', 'location.'],
    choose: [
      ['Traffic and dwell time', 'Compare the daily contacts, but also how long people see the site. At traffic lights, tram stops and junctions, eyes rest on the banner longer than on a road where traffic keeps moving.'],
      ['Audience', 'A site by Messe Basel reaches different people than one in a residential area. Think about who passes the site: commuters, trade fair visitors, residents or tourists.'],
      ['Period', 'Scaffolding sites only exist while a renovation is under way. Check that the available period fits your campaign; the minimum booking is 4 weeks.'],
      ['Content and permit', 'The advertising permit can exclude content. At Riehenring 141, for example, alcohol, political and pornographic advertising is not allowed. Ask us before you design the artwork.'],
    ],
    stepsEyebrow: 'Process',
    stepsTitle: ['From enquiry ', 'to banner.'],
    steps: [
      ['Enquiry', 'Choose a site and send us an enquiry. On weekdays you receive a quote within 24 hours, valid for 30 days.'],
      ['Booking', 'Once you confirm, we reserve the site. The quote includes the permit, print, installation and removal.'],
      ['Permit and artwork', 'We submit the permit application. You deliver the print files no later than 10 working days before the campaign starts.'],
      ['Installation and run', 'We print and install the banner and take it down again when the campaign period ends.'],
    ],
    stepsNote: ['All conditions are in our ', 'terms', '.'],
  },
} as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  return generateSEOMetadata({ title: c.title, description: c.description, path: '/standorte', locale });
}

export default function LocationsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  const url = `${SITE}/${locale}/standorte`;
  const all = PLACEMENT_KINDS.flatMap((k) => getCurrentPlacements(k).map((p) => localizePlacement(p, locale)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#list`,
    name: c.title,
    url,
    numberOfItems: all.length,
    itemListElement: all.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE}/${locale}${placementPath(p)}`,
    })),
  };

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {c.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {c.h1a}<span className="italic text-cream">{c.h1b}</span>
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {c.lede}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-16">
          <div className="shell">
            <LocationsIndex locale={locale} />

            <nav aria-label={c.more} className="mt-4 pt-8 border-t border-rule flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">{c.more}</span>
              {c.links.map(([href, label]) => (
                <Link key={href} href={href} className="font-ui text-[13px] text-ink-soft hover:text-mid underline underline-offset-4 decoration-rule">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="py-16">
          <div className="shell">
            <div className="max-w-5xl mx-auto">
              <span className="sec-no inline-block mb-4 text-mid">§ {c.chooseEyebrow}</span>
              <h2 className="font-display font-normal m-0 mb-10 text-ink" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {c.chooseTitle[0]}<span className="italic text-mid">{c.chooseTitle[1]}</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {c.choose.map(([title, body]) => (
                  <div key={title} className="bg-white border border-rule rounded-[20px] p-7">
                    <h3 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{title}</h3>
                    <p className="text-[15px] leading-[1.65] text-ink-soft m-0">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-16 pb-28">
          <div className="shell">
            <div className="max-w-5xl mx-auto">
              <span className="sec-no inline-block mb-4 text-mid">§ {c.stepsEyebrow}</span>
              <h2 className="font-display font-normal m-0 mb-10 text-ink" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {c.stepsTitle[0]}<span className="italic text-mid">{c.stepsTitle[1]}</span>
              </h2>
              <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
                {c.steps.map(([title, body], i) => (
                  <li key={title} className="border-t border-ink/20 pt-5">
                    <div className="font-display italic text-mid mb-2" style={{ fontSize: 28, lineHeight: 1 }}>0{i + 1}.</div>
                    <h3 className="font-display font-normal m-0 mb-2 text-ink" style={{ fontSize: 19, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{title}</h3>
                    <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0">{body}</p>
                  </li>
                ))}
              </ol>
              <p className="text-[14px] text-muted mt-8 mb-0">
                {c.stepsNote[0]}
                <Link href={`/${locale}/terms`} className="text-mid underline underline-offset-4">{c.stepsNote[1]}</Link>
                {c.stepsNote[2]}
              </p>
            </div>
          </div>
        </section>

      </GroundFlow>
    </div>
  );
}
