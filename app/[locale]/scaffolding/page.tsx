import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import ScaffoldingPageClient from './ScaffoldingPageClient';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return locale === 'en'
    ? {
        title: 'Scaffolding Banners | Premium Short-Term OOH',
        description: 'Explore our portfolio of scaffolding banner placements across Basel, Zurich, and Switzerland. Flexible, high-impact, short-term advertising solutions.',
      }
    : {
        title: 'Gerüstwerbung | Premium-Aussenwerbung auf Zeit',
        description: 'Entdecken Sie unsere Gerüstwerbeflächen in Basel, Zürich und der ganzen Schweiz. Flexible, wirkungsvolle Aussenwerbung auf Zeit.',
      };
}

export default function ScaffoldingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <ScaffoldingPageClient />;
}
