import { Metadata } from 'next';
import Link from 'next/link';
import ContactPageClient from './ContactPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';

  let title: string, description: string, keywords: string;
  if (isGerman) {
    title = 'Kontakt | Aussenwerbung Schweiz';
    description = 'Offerte für Gerüst- oder Fassadenwerbung in Basel anfragen: Antwort innert 24 Stunden an Werktagen. Tel. +41 77 233 81 21, theodor.staal@hydemedia.ch.';
    keywords = 'Kontakt Hyde Media, Aussenwerbung Schweiz, Bannerwerbung Basel, Fassadenwerbung, Gerüstbanner';
  } else {
    title = 'Contact | Outdoor Advertising Switzerland';
    description = 'Request a quote for scaffolding or facade advertising in Basel. We reply within 24 hours on weekdays. Call +41 77 233 81 21 or email theodor.staal@hydemedia.ch.';
    keywords = 'contact hydemedia, outdoor advertising Switzerland, banner advertising Basel, facade advertising, scaffolding banner';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/contact', locale });
}

/** A query value from a link on the site; anything unexpected is dropped. */
function param(v: string | string[] | undefined): string | undefined {
  const value = Array.isArray(v) ? v[0] : v;
  return value && value.length <= 120 ? value : undefined;
}

// Reads ?location= and ?inquiry= to prefill the form, so it renders per request.
export const dynamic = 'force-dynamic';

const GUIDE = {
  de: {
    needTitle: 'Was wir für eine Offerte brauchen',
    need: [
      'Den gewünschten Standort oder die Stadt und das Quartier, in dem Sie sichtbar sein möchten.',
      'Den Zeitraum der Kampagne, idealerweise in Kalenderwochen. Die Mindestbuchung beträgt 4 Wochen.',
      'Was beworben wird, damit wir prüfen können, ob die Reklamebewilligung den Inhalt zulässt.',
      'Ob Sie die Druckdaten selbst liefern oder Unterstützung bei der Gestaltung wünschen.',
    ],
    nextTitle: 'Was danach passiert',
    next: [
      'Sie erhalten an Werktagen innert 24 Stunden eine Antwort und eine Offerte, die 30 Tage gültig ist.',
      'Nach Ihrer Bestätigung reservieren wir den Standort und reichen das Bewilligungsgesuch ein.',
      'Die Druckdaten brauchen wir spätestens 10 Arbeitstage vor Kampagnenstart. Druck, Montage und Demontage übernehmen wir.',
    ],
    terms: ['Die Bedingungen stehen in unseren ', 'AGB', '. Antworten auf häufige Fragen finden Sie im ', 'FAQ', '.'],
  },
  en: {
    needTitle: 'What we need for a quote',
    need: [
      'The location you want, or the city and area where you want to be seen.',
      'The campaign period, ideally in calendar weeks. The minimum booking is 4 weeks.',
      'What you are advertising, so we can check that the permit allows the content.',
      'Whether you supply the print files yourself or want help with the design.',
    ],
    nextTitle: 'What happens next',
    next: [
      'On weekdays you get a reply within 24 hours, with a quote that is valid for 30 days.',
      'Once you confirm, we reserve the site and submit the permit application.',
      'We need the print files no later than 10 working days before the campaign starts. We handle print, installation and removal.',
    ],
    terms: ['The conditions are in our ', 'terms', '. Answers to common questions are in the ', 'FAQ', '.'],
  },
} as const;

/** Server-rendered help text below the form, so the page explains the process without JS. */
function ContactGuide({ locale }: { locale: string }) {
  const g = GUIDE[locale === 'en' ? 'en' : 'de'];
  const h2 = 'font-display font-normal m-0 mb-5 text-ink';
  return (
    <section className="pb-48">
      <div className="shell">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 border-t border-rule pt-14">
          <div>
            <h2 className={h2} style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{g.needTitle}</h2>
            <ul className="m-0 pl-5 space-y-2.5 text-[15px] leading-[1.6] text-ink-soft list-disc marker:text-mid">
              {g.need.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div>
            <h2 className={h2} style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{g.nextTitle}</h2>
            <ol className="m-0 pl-5 space-y-2.5 text-[15px] leading-[1.6] text-ink-soft list-decimal marker:text-mid">
              {g.next.map((x) => <li key={x}>{x}</li>)}
            </ol>
          </div>
        </div>
        <p className="max-w-5xl mx-auto text-[14px] text-ink-soft mt-8 mb-0">
          {g.terms[0]}
          <Link href={`/${locale}/terms`} className="text-mid underline underline-offset-4">{g.terms[1]}</Link>
          {g.terms[2]}
          <Link href={`/${locale}/faq`} className="text-mid underline underline-offset-4">{g.terms[3]}</Link>
          {g.terms[4]}
        </p>
      </div>
    </section>
  );
}

export default async function ContactPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const isGerman = locale === 'de';

  const sdTitle = isGerman ? 'Kontakt Hyde Media' : 'Contact Hyde Media';
  const sdDesc = isGerman
    ? 'Kontaktieren Sie uns für Grossformat-Aussenwerbung. E-Mail: theodor.staal@hydemedia.ch, Tel: +41 77 233 81 21'
    : 'Contact us for large-format outdoor advertising. Email: theodor.staal@hydemedia.ch, Phone: +41 77 233 81 21';

  return (
    <>
      <StructuredData
        type="Service"
        title={sdTitle}
        description={sdDesc}
        url={`/${locale}/contact`}
      />
      <ContactPageClient locale={locale} location={param(searchParams.location)} inquiry={param(searchParams.inquiry)}>
        <ContactGuide locale={locale} />
      </ContactPageClient>
    </>
  );
}
