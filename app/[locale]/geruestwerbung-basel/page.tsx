import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import GeruestBaselClient from './GeruestBaselClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Gerüstwerbung in Basel: Standorte und Verkehrszahlen' : 'Scaffolding Advertising in Basel',
    description: isGerman
      ? "Gerüstwerbung in Basel am Riehenring bei der Messe Basel. Gerüstbanner bis 175 m² mit 39'851 Kontakten pro Tag. Bewilligung, Druck und Montage inklusive."
      : "Scaffolding advertising in Basel on Riehenring by Messe Basel. Banners up to 175 m² with 39,851 contacts per day. Permit, print and installation included.",
    keywords: isGerman
      ? 'Gerüstwerbung Basel, Gerüstbanner Basel, Aussenwerbung Basel, Werbung Messe Basel, Grossformat Werbung Basel, Baugerüst Werbung Basel'
      : 'scaffolding advertising Basel, scaffold banner Basel, outdoor advertising Basel, Messe Basel advertising',
    path: '/geruestwerbung-basel',
    locale,
    image: '/images/cases/grand-casino-basel-2.jpg',
  });
}

export default function GeruestBaselPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <GeruestBaselClient />;
}
