import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BrandsPageClient from './BrandsPageClient';
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
    title = 'Für Marken - Grossformat-Aussenwerbung Schweiz';
    description = 'Maximale Sichtbarkeit für Ihre Marke mit strategisch platzierten Bannern in Basel und der Schweiz. Premium-Standorte. Kostenloses Angebot anfordern.';
    keywords = 'Aussenwerbung Marken, Bannerwerbung Basel, Fassadenwerbung Schweiz, Grossformat Werbung, Produktlancierung Kampagne, Markenbekanntheit Schweiz';
  } else if (isDanish) {
    title = 'For Brands - Outdoor Reklame i Storformat Danmark';
    description = 'Maksimal synlighed for dit brand med strategisk placerede bannere på Frederiksberg og gavlnetværk på Aarhus indfaldsveje. 7+ premium placeringer. Få gratis tilbud i dag.';
    keywords = 'outdoor reklame brands, banner reklame frederiksberg, facade reklame aarhus, gavl reklame, storformat reklame, produktlancering kampagne, brand awareness danmark';
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
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  const sdTitle = isGerman
    ? 'Aussenwerbung für Marken - Hyde Media'
    : isDanish
    ? 'Outdoor Reklame for Brands - Hyde Media'
    : 'Outdoor Advertising for Brands - Hyde Media';
  const sdDesc = isGerman
    ? 'Professionelle Grossformat-Aussenwerbung. Premium-Standorte in Basel und der Schweiz. Kontakt: theodor.staal@hydemedia.ch, +41 77 233 81 21'
    : isDanish
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
