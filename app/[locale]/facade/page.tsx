import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import FacadePageClient from './FacadePageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Fassadenwerbung & Gebäudeverkleidungen | Hyde Media',
  description: 'Entdecken Sie unser Portfolio an Fassadenbannern und Gebäudeverkleidungen in Basel, Zürich und der ganzen Schweiz. Langfristige Aussenwerbung mit maximaler Wirkung.',
};

export default function FacadePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <FacadePageClient />;
}
