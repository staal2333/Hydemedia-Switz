import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BrandsPageClient from './BrandsPageClient';
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
    title = 'Für Marken - Grossformat-Aussenwerbung Schweiz';
    description = 'Maximale Sichtbarkeit für Ihre Marke mit strategisch platzierten Bannern in Basel und der Schweiz. Premium-Standorte. Kostenloses Angebot anfordern.';
    keywords = 'Aussenwerbung Marken, Bannerwerbung Basel, Fassadenwerbung Schweiz, Grossformat Werbung, Produktlancierung Kampagne, Markenbekanntheit Schweiz';
  } else {
    title = 'For Brands - Large-Format Outdoor Advertising';
    description = 'Maximum visibility for your brand with strategically placed banners at premium locations. Get a free quote today.';
    keywords = 'outdoor advertising brands, banner advertising, gable advertising, large format advertising, product launch campaign, brand awareness';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/brands', locale });
}

export default async function BrandsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isGerman = locale !== 'en';

  const sdTitle = isGerman
    ? 'Aussenwerbung für Marken - Hyde Media'
    : 'Outdoor Advertising for Brands - Hyde Media';
  const sdDesc = isGerman
    ? 'Professionelle Grossformat-Aussenwerbung. Premium-Standorte in Basel und der Schweiz. Kontakt: theodor.staal@hydemedia.ch, +41 77 233 81 21'
    : 'Professional large-format outdoor advertising. Premium locations in Basel and Switzerland. Contact: theodor.staal@hydemedia.ch, +41 77 233 81 21';

  return (
    <>
      <StructuredData
        type="Service"
        title={sdTitle}
        description={sdDesc}
        url={`/${locale}/brands`}
      />
      <BrandsPageClient locale={locale} />
    </>
  );
}
