import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ServiceGuide from '@/components/ServiceGuide';
import ServicesPageClient from './ServicesPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';


// The pillar page for "Aussenwerbung": what the formats are and how to choose.
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';

  const title = isGerman
    ? 'Aussenwerbung in der Schweiz: Gerüst und Fassade'
    : 'Outdoor Advertising in Switzerland: Scaffolding, Facades';
  const description = isGerman
    ? 'Aussenwerbung im Grossformat: Gerüstwerbung und Fassadenwerbung in Basel und der Schweiz. Standorte mit Verkehrszahlen, Druck, Montage und Bewilligung aus einer Hand.'
    : 'Large-format outdoor advertising: scaffolding and facade advertising in Basel and Switzerland. Sites with traffic figures, with print, installation and permits handled for you.';
  const keywords = isGerman
    ? 'Aussenwerbung, Aussenwerbung Schweiz, Out-of-Home, OOH Schweiz, Gerüstwerbung, Fassadenwerbung, Grossformat Werbung, Aussenwerbung Basel, Werbebanner'
    : 'outdoor advertising, outdoor advertising Switzerland, OOH, scaffolding advertising, facade advertising, large format advertising, Basel';

  return generateSEOMetadata({ title, description, keywords, path: '/services', locale });
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isGerman = locale !== 'en';

  const sdTitle = isGerman
    ? 'Aussenwerbung: Gerüstwerbung und Fassadenwerbung'
    : 'Outdoor Advertising: Scaffolding and Facade Advertising';
  const sdDesc = isGerman
    ? 'Aussenwerbung im Grossformat mit Gerüstwerbung und Fassadenwerbung in Basel und der Schweiz, inklusive Druck, Montage und Bewilligung.'
    : 'Large-format outdoor advertising with scaffolding and facade banners in Basel and Switzerland, including print, installation and permits.';

  return (
    <>
      <StructuredData type="Service" title={sdTitle} description={sdDesc} url={`/${locale}/services`} />
      <ServicesPageClient locale={locale}>
        <ServiceGuide kind="overview" locale={locale} />
      </ServicesPageClient>
    </>
  );
}
