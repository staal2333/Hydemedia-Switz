import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CasesPageClient from './CasesPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';

  let title: string, description: string, keywords: string;
  if (isGerman) {
    title = 'Referenzen: Gerüst- und Fassadenkampagnen';
    description = 'Referenzen von Hyde Media: Gerüst- und Fassadenkampagnen für Grand Casino Basel, EVO Fitness und weitere Marken – mit Standort, Format und Laufzeit.';
    keywords = 'Bannerkampagnen Referenzen, Werbekampagnen Schweiz, Kundenreferenzen, Aussenwerbung Beispiele, erfolgreiche Kampagnen';
  } else {
    title = 'Cases: Scaffolding and Facade Campaigns';
    description = 'Hyde Media cases: scaffolding and facade campaigns for Grand Casino Basel, EVO Fitness and other brands, with location, format and campaign length.';
    keywords = 'banner campaign cases, advertising campaigns, client cases, outdoor advertising examples, successful campaigns';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/cases', locale });
}

export default async function CasesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isGerman = locale !== 'en';

  const sdTitle = isGerman ? 'Referenzen & Marken' : 'Cases & Brands';
  const sdDesc = isGerman
    ? 'Entdecken Sie unsere neuesten Kampagnen und Kunden'
    : 'See our latest campaigns and clients';

  return (
    <>
      <StructuredData
        type="Service"
        title={sdTitle}
        description={sdDesc}
        url={`/${locale}/cases`}
      />
      <CasesPageClient />
    </>
  );
}
