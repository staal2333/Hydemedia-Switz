import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { detailBreadcrumb } from '@/lib/breadcrumbs';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import CaseStudyDetailClient from './CaseStudyDetailClient';
import casesData from '@/public/data/cases.json';
import { localizeCase, type CaseStudy } from '@/lib/placements';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const caseStudy = casesData.find((c) => c.slug === slug);
  
  if (!caseStudy) {
    // notFound() here, not a noindex title: metadata resolves before the page
    // streams, so this is the only point that can still send a real 404.
    // Returning metadata let the loading boundary flush a 200 first (a soft 404).
    notFound();
  }

  // Case pages carry the strongest proof on the site, so they get the full
  // treatment: canonical, hreflang, and their own photo as the share image.
  const c = localizeCase(caseStudy as unknown as CaseStudy, locale);
  return generateSEOMetadata({
    title: `${c.brand} – ${c.format}`,
    description: c.challenge.substring(0, 155),
    keywords: [c.brand, c.format, c.location, locale === 'en' ? 'outdoor advertising' : 'Aussenwerbung', locale === 'en' ? 'case study' : 'Referenz'].join(', '),
    path: `/cases/${slug}`,
    locale,
    image: caseStudy.images[0],
  });
}

export default function CaseStudyDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  const caseStudy = casesData.find((c) => c.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const c = localizeCase(caseStudy as unknown as CaseStudy, locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(detailBreadcrumb('https://www.hydemedia.ch', locale, 'cases', `${c.brand} – ${c.format}`, `/cases/${slug}`)),
        }}
      />
      <CaseStudyDetailClient caseStudy={caseStudy} />
    </>
  );
}
