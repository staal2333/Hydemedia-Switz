import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PropertyOwnersPageClient from './PropertyOwnersPageClient';
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
    title = 'Für Immobilienbesitzer - Fassade & Gerüst vermieten';
    description = 'Zusatzeinnahmen mit Fassade oder Baugerüst: Hyde Media vermarktet Werbeflächen für Eigentümer und Verwaltungen in Basel – inklusive Bewilligung, Montage und Abbau.';
    keywords = 'Fassade vermieten, Fassadenvermietung, Gerüstvermietung, Immobilienbesitzer Einkommen, Eigentümergemeinschaft, Hausverwaltung, Fassadenwerbung Einkommen';
  } else {
    title = 'For Property Owners - Rent Out Facade & Scaffolding';
    description = 'Earn extra income from your facade or scaffolding. Hyde Media markets the space for owners and managers in Basel and handles permit, installation and removal.';
    keywords = 'rent out facade, facade rental, scaffolding rental, property owner income, owner association, property manager, building wraps';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/property-owners', locale });
}

export default async function PropertyOwnersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isGerman = locale !== 'en';

  const sdTitle = isGerman
    ? 'Vermieten Sie Ihre Fassade oder Ihr Gerüst'
    : 'Rent Out Your Facade or Scaffolding';
  const sdDesc = isGerman
    ? 'Professioneller Service für Immobilienbesitzer in der Schweiz'
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
