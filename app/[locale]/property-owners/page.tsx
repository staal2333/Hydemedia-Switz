import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PropertyOwnersPageClient from './PropertyOwnersPageClient';
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
    title = 'Für Immobilienbesitzer - Fassade & Gerüst vermieten';
    description = 'Generieren Sie zusätzliches Einkommen mit Ihren Fassaden und Gerüsten. Hyde Media unterstützt Immobilienbesitzer, Eigentümergemeinschaften und Hausverwaltungen. Wir kümmern uns um Bewilligungen und alle praktischen Details.';
    keywords = 'Fassade vermieten, Fassadenvermietung, Gerüstvermietung, Immobilienbesitzer Einkommen, Eigentümergemeinschaft, Hausverwaltung, Fassadenwerbung Einkommen';
  } else if (isDanish) {
    title = 'For Ejendomsejere - Udlej Facade & Stilladser';
    description = 'Generer ekstra indtægt fra dine facader og stilladser. Hyde Media hjælper ejendomsejere, ejerforeninger, ejendomsadministratorer, virksomheder og stilladsfirmaer. Vi håndterer tilladelser, beboer-information og alt praktisk. Professionel service i hele Danmark.';
    keywords = 'udlej facade, facade udlejning, stillads udlejning, ejendomsejer indtægt, ejerforening, ejendomsadministrator, building wraps, facade reklame indtægt, stilladsfirma partnerskab';
  } else {
    title = 'For Property Owners - Rent Out Facade & Scaffolding';
    description = 'Generate additional income from your facades and scaffolding. We handle permits, resident information and all practical matters. Professional service.';
    keywords = 'rent out facade, facade rental, scaffolding rental, property owner income, owner association, property manager, building wraps';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/property-owners', locale });
}

export default async function PropertyOwnersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  const sdTitle = isGerman
    ? 'Vermieten Sie Ihre Fassade oder Ihr Gerüst'
    : isDanish
    ? 'Udlej Din Facade eller Stillads'
    : 'Rent Out Your Facade or Scaffolding';
  const sdDesc = isGerman
    ? 'Professioneller Service für Immobilienbesitzer in der Schweiz'
    : isDanish
    ? 'Professionel service til ejendomsejere i hele Danmark'
    : 'Professional service for property owners';

  return (
    <>
      <StructuredData
        type="Service"
        title={sdTitle}
        description={sdDesc}
        url={`/${locale}/property-owners`}
      />
      <PropertyOwnersPageClient locale={locale} />
    </>
  );
}
