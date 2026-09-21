import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import FacadePageClient from './FacadePageClient';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return locale === 'en'
    ? {
        title: 'Facade Advertising & Building Wraps',
        description: 'Explore our facade banners and building wraps in Basel, Zurich and across Switzerland. Long-term outdoor advertising with maximum impact.',
      }
    : {
        title: 'Fassadenwerbung & Gebäudeverkleidungen',
        description: 'Entdecken Sie unser Portfolio an Fassadenbannern und Gebäudeverkleidungen in Basel, Zürich und der ganzen Schweiz. Langfristige Aussenwerbung mit maximaler Wirkung.',
      };
}

export default function FacadePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <FacadePageClient />;
}
