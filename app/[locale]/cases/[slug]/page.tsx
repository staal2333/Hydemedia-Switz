import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { detailBreadcrumb } from '@/lib/breadcrumbs';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import CaseStudyDetailClient from './CaseStudyDetailClient';
import casesData from '@/public/data/cases.json';
import { localizeCase, type CaseStudy } from '@/lib/placements';


export function generateStaticParams() {
  return (casesData as CaseStudy[]).flatMap((c) => ['de', 'en'].map((locale) => ({ locale, slug: c.slug })));
}

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
  // Three other cases, Basel ones first, so every case links onwards.
  const others = (casesData as unknown as CaseStudy[])
    .filter((o) => o.slug !== slug)
    .sort((a, b) => Number(/basel/i.test(b.location)) - Number(/basel/i.test(a.location)))
    .slice(0, 3)
    .map((o) => {
      const l = localizeCase(o, locale);
      return { slug: o.slug, brand: o.brand, location: l.location, format: l.format, image: o.images?.[0] ?? null };
    });
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
  // Three other cases, Basel ones first, so every case links onwards.
  const others = (casesData as unknown as CaseStudy[])
    .filter((o) => o.slug !== slug)
    .sort((a, b) => Number(/basel/i.test(b.location)) - Number(/basel/i.test(a.location)))
    .slice(0, 3)
    .map((o) => {
      const l = localizeCase(o, locale);
      return { slug: o.slug, brand: o.brand, location: l.location, format: l.format, image: o.images?.[0] ?? null };
    });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(detailBreadcrumb('https://www.hydemedia.ch', locale, 'cases', `${c.brand} – ${c.format}`, `/cases/${slug}`)),
        }}
      />
      <CaseStudyDetailClient caseStudy={caseStudy} others={others} />
    </>
  );
}
