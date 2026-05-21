import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactPageClient from './ContactPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';

  let title: string, description: string, keywords: string;
  if (isGerman) {
    title = 'Kontakt | Aussenwerbung Schweiz';
    description = 'Kontaktieren Sie Hyde Media. Wir helfen Marken und Immobilieneigentümern mit Grossformat-Aussenwerbung in Basel und der Schweiz. Tel: +41 77 233 81 21 oder E-Mail: theodor.staal@hydemedia.ch';
    keywords = 'Kontakt Hyde Media, Aussenwerbung Schweiz, Bannerwerbung Basel, Fassadenwerbung, Gerüstbanner';
  } else {
    title = 'Contact | Outdoor Advertising Switzerland';
    description = 'Get in touch with Hyde Media. We help brands and property owners with large-format outdoor advertising in Basel and Switzerland. Call +41 77 233 81 21 or email theodor.staal@hydemedia.ch';
    keywords = 'contact hydemedia, outdoor advertising Switzerland, banner advertising Basel, facade advertising, scaffolding banner';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/contact', locale });
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isGerman = locale === 'de';

  const sdTitle = 'Kontakt Hyde Media';
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
      <ContactPageClient locale={locale} />
    </>
  );
}
