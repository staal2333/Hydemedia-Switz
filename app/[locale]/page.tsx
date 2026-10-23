import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { locales } from '@/i18n';
import blogDe from '@/public/data/blog-de.json';
import blogEn from '@/public/data/blog-en.json';


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';

  let title: string, description: string, keywords: string;

  // The homepage sells to brands, so its title carries the terms they search for.
  if (isGerman) {
    title = 'Gerüstwerbung & Fassadenwerbung in Basel und der Schweiz';
    description = 'Aussenwerbung im Grossformat: Gerüstbanner und Fassadenbanner an verkehrsreichen Standorten in Basel und der Schweiz. Bewilligung, Druck und Montage aus einer Hand.';
    keywords = 'Gerüstwerbung, Fassadenwerbung, Aussenwerbung Schweiz, Aussenwerbung Basel, Gerüstbanner, Fassadenbanner, Grossformat Werbung, OOH Schweiz, Werbebanner';
  } else {
    title = 'Scaffolding & Facade Advertising in Switzerland';
    description = 'Large-format outdoor advertising: scaffolding and facade banners at busy sites in Basel and Switzerland. Permit, print and installation handled for you.';
    keywords = 'scaffolding advertising, facade advertising, outdoor advertising Switzerland, outdoor advertising Basel, OOH, large format advertising, banner advertising';
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
  
  const isGerman = locale !== 'en';

  const serviceTitle = isGerman
    ? 'Aussenwerbung: Gerüstwerbung und Fassadenwerbung'
    : 'Outdoor Advertising: Scaffolding and Facade Advertising';

  const serviceDesc = isGerman
    ? 'Gerüstwerbung und Fassadenwerbung im Grossformat in Basel und der Schweiz, inklusive Bewilligung, Druck und Montage.'
    : 'Large-format scaffolding and facade advertising in Basel and Switzerland, including permit, print and installation.';

  return (
    <>
      <StructuredData
        type="Service"
        title={serviceTitle}
        description={serviceDesc}
        url={`/${locale}`}
      />
      <HomePageClient
        journal={(locale === 'en' ? blogEn : blogDe)
          .slice(0, 3)
          .map(({ content, ...card }) => card)}
      />
    </>
  );
}
