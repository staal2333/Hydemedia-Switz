import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServicesPageClient from './ServicesPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  let title: string, description: string, keywords: string;

  if (isGerman) {
    title = 'Gerüstwerbung & Fassadenwerbung | Aussenwerbung Schweiz';
    description = 'Komplette Aussenwerbung in der Schweiz. Gerüstwerbung, Fassadenwerbung und Grossformat OOH-Lösungen. Professioneller Service mit Design, Produktion und Installation. Angebot anfordern!';
    keywords = 'Gerüstwerbung, Fassadenwerbung, Aussenwerbung, OOH Schweiz, Grossformat Werbung, Aussenwerbung Basel, Fassadenbanner, Gerüstbanner';
  } else if (isDanish) {
    title = 'Stilladsreklame & Facadereklame Services | Outdoor Marketing';
    description = 'Komplet outdoor marketing i Danmark. Stilladsreklame, facadereklame og OOH-løsninger i storformat. Fra København til Aarhus – professionel service med design, produktion og installation. Få tilbud nu!';
    keywords = 'stilladsreklame, facadereklame, outdoor marketing, OOH danmark, storformat reklame, outdoor marketing københavn, facade reklame, stillads reklame, bannerreklame services';
  } else {
    title = 'Scaffolding & Facade Advertising Services | Outdoor Marketing';
    description = 'Complete outdoor marketing solutions. Scaffolding advertising, facade advertising and large-format OOH solutions. Professional service with design, production and installation. Get a quote now!';
    keywords = 'scaffolding advertising, facade advertising, outdoor marketing, OOH, large format advertising, facade ads, scaffolding ads, banner advertising services';
  }

  return generateSEOMetadata({
    title,
    description,
    keywords,
    path: '/services',
    locale,
  });
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  const sdTitle = isGerman
    ? 'Aussenwerbung - Gerüstwerbung & Fassadenwerbung'
    : isDanish
    ? 'Outdoor Marketing Services - Stilladsreklame & Facadereklame'
    : 'Outdoor Marketing Services - Scaffolding & Facade Advertising';

  const sdDesc = isGerman
    ? 'Komplette Aussenwerbung mit Gerüstwerbung und Fassadenwerbung in Grossformat. OOH-Lösungen in der Schweiz.'
    : isDanish
    ? 'Komplet outdoor marketing med stilladsreklame og facadereklame i storformat. OOH-løsninger i hele Danmark.'
    : 'Complete outdoor marketing with scaffolding and facade advertising in large format. OOH solutions.';

  return (
    <>
      <StructuredData
        type="Service"
        title={sdTitle}
        description={sdDesc}
        url={`/${locale}/services`}
      />
      <ServicesPageClient locale={locale} />
    </>
  );
}
