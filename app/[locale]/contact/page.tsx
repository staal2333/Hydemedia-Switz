import { Metadata } from 'next';
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
      <ContactPageClient locale={locale} location={param(searchParams.location)} inquiry={param(searchParams.inquiry)} />
    </>
  );
}
