import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import PartnersPageClient from './PartnersPageClient';
import StructuredData from '@/components/StructuredData';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hydemedia.ch';

  let title: string, description: string, keywords: string, ogTitle: string, ogDesc: string;
  if (isGerman) {
    title = 'Partner werden - Einkommen mit Ihrer Immobilie';
    description = 'Verdienen Sie passives Einkommen mit Ihrer Fassade oder Ihrem Gerüst. Hyde Media übernimmt alles – Bewilligungen, Installation, Wartung. 100% sorgenfreier Service. Kontaktieren Sie uns!';
    keywords = 'Partnerprogramm, Fassadenvermietung, Gerüstwerbung, passives Einkommen Immobilie, Fassadenwerbung Partner';
    ogTitle = 'Partner werden - Einkommen mit Ihrer Immobilie';
    ogDesc = 'Verdienen Sie passives Einkommen mit Ihrer Fassade oder Ihrem Gerüst. 100% sorgenfrei.';
  } else if (isDanish) {
    title = 'Bliv Partner - Generer Indtægt fra Din Ejendom';
    description = 'Tjén passiv indtægt på din facade eller stillads. Hyde Media håndterer alt - tilladelser, installation, vedligeholdelse. 100% problemfri service i hele Danmark. Kontakt os i dag!';
    keywords = 'partner program, facade udlejning, stillads reklame, passiv indtægt ejendom, building wrap partner, ejendomsejer indtægt, facade advertising, outdoor media partner';
    ogTitle = 'Bliv Partner - Generer Indtægt fra Din Ejendom';
    ogDesc = 'Tjén passiv indtægt på din facade eller stillads. 100% problemfri service.';
  } else {
    title = 'Become a Partner - Generate Income from Your Property';
    description = 'Earn passive income from your facade or scaffolding. Hyde Media handles everything - permits, installation, maintenance. 100% hassle-free service. Contact us today!';
    keywords = 'partner program, facade rental, scaffolding advertising, passive property income, building wrap partner, property owner income';
    ogTitle = 'Become a Partner - Generate Income from Your Property';
    ogDesc = 'Earn passive income from your facade or scaffolding. 100% hassle-free.';
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: `${siteUrl}/${locale}/partners`,
      type: 'website',
      images: [{ url: `${siteUrl}/og-partners.jpg`, width: 1200, height: 630, alt: 'Hyde Media Partner Program' }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: ogTitle,
      description: ogDesc,
      images: [`${siteUrl}/og-partners.jpg`],
    },
  };
}

export default function PartnersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  const sdDesc = isGerman
    ? 'Verdienen Sie passives Einkommen mit Ihrer Immobilie durch unser Aussenwerbung-Netzwerk'
    : isDanish
    ? 'Generer passiv indtægt fra din ejendom med outdoor advertising netværk'
    : 'Generate passive income from your property with our outdoor advertising network';

  return (
    <>
      <StructuredData
        type="Service"
        title="Hyde Media Partner Program"
        description={sdDesc}
        url={`/${locale}/partners`}
      />
      <PartnersPageClient />
    </>
  );
}
