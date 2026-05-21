import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import PricingPageClient from './PricingPageClient';

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
    title = 'Preise - Fair & Transparent Schweiz';
    description = 'Keine versteckten Gebühren. Einfache, transparente Preise für Aussenwerbung, Gebäudeverkleidungen und Premium-Banner in der Schweiz. Kostenloses Angebot anfordern.';
    keywords = 'Aussenwerbung Preise, Bannerwerbung Preise, Fassadenwerbung Kosten, Gerüstwerbung Kosten, transparente Preisgestaltung';
  } else if (isDanish) {
    title = 'Priser - Fair & Transparent Danmark';
    description = 'Ingen skjulte gebyrer. Enkle, gennemsigtige priser for outdoor reklame, facadewraps og premium bannere i hele Danmark. Få et gratis tilbud i dag.';
    keywords = 'priser outdoor reklame, banner reklame priser, facade reklame pris, stilladsreklame omkostninger, transparent prissætning';
  } else {
    title = 'Pricing - Fair & Transparent';
    description = 'No hidden fees. Simple, transparent pricing for outdoor advertising, building wraps, and premium banners. Get a free quote today.';
    keywords = 'outdoor advertising prices, banner advertising prices, facade advertising cost, scaffolding advertising costs, transparent pricing';
  }

  return generateSEOMetadata({
    title,
    description,
    keywords,
    path: '/pricing',
    locale,
  });
}

export default function PricingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <PricingPageClient />;
}
