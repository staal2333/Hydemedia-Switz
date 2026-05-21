import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import ScaffoldingPageClient from './ScaffoldingPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Scaffolding Banners | Premium Short-Term OOH | Hyde Media',
  description: 'Explore our portfolio of scaffolding banner placements across Basel, Zurich, and Switzerland. Flexible, high-impact, short-term advertising solutions.',
};

export default function ScaffoldingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <ScaffoldingPageClient />;
}
