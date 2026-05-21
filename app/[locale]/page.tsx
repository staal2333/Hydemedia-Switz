import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { locales } from '@/i18n';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';
  
  let title: string, description: string, keywords: string;

  if (isGerman) {
    title = 'Fassadenwerbung Schweiz | Fassade vermieten Basel & Zürich';
    description = 'Monetarisieren Sie Ihre Gebäudefassade in Basel oder Zürich. Hyde Media sucht Fassaden für professionelle Aussenwerbung. Attraktive Einnahmen, null Aufwand.';
    keywords = 'Fassade vermieten, Fassadenwerbung Schweiz, Aussenwerbung Basel, Gebäude monetarisieren, Fassadenfläche vermieten Basel, Aussenwerbung Standort, OOH Schweiz, Fassadenbanner, Aussenwerbung Zürich';
  } else if (isDanish) {
    title = 'Stilladsreklame & Facadereklame | Outdoor Marketing Danmark';
    description = 'Danmarks førende udbyder af outdoor marketing. Stilladsreklame og facadereklame i København, Aarhus og hele Danmark. Professionel OOH i storformat – fra design til installation. Få tilbud i dag!';
    keywords = 'stilladsreklame, facadereklame, outdoor marketing danmark, outdoor marketing københavn, OOH, storformat reklame, stillads reklame københavn, facade reklame aarhus, bannerreklame, outdoor reklame danmark';
  } else {
    title = 'Scaffolding & Facade Advertising | Outdoor Marketing';
    description = 'Professional outdoor marketing with scaffolding and facade advertising. Large-format OOH – from design to installation. Get a quote today!';
    keywords = 'scaffolding advertising, facade advertising, outdoor marketing, OOH, large format advertising, banner advertising, outdoor advertising';
  }

  return generateSEOMetadata({
    title,
    description,
    keywords,
    path: '',
    locale,
  });
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  setRequestLocale(locale);
  
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  const serviceTitle = isGerman
    ? 'Fassadenwerbung - Fassade vermieten in der Schweiz'
    : isDanish
    ? 'Outdoor Marketing - Stilladsreklame & Facadereklame'
    : 'Outdoor Marketing - Scaffolding & Facade Advertising';
  
  const serviceDesc = isGerman
    ? 'Vermieten Sie Ihre Fassade für professionelle Aussenwerbung in Basel und Zürich. Attraktive Einnahmen für Immobilienbesitzer.'
    : isDanish
    ? 'Professionel outdoor marketing med stilladsreklame og facadereklame i København, Aarhus og hele Danmark. OOH-løsninger i storformat.'
    : 'Professional outdoor marketing with scaffolding and facade advertising. Large-format OOH solutions.';

  return (
    <>
      <StructuredData
        type="Service"
        title={serviceTitle}
        description={serviceDesc}
        url={`/${locale}`}
      />
      <HomePageClient />
    </>
  );
}
