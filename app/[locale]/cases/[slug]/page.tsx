import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import CaseStudyDetailClient from './CaseStudyDetailClient';
import casesDe from '@/public/data/cases.json';
import casesEn from '@/public/data/cases-en.json';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const casesData = locale === 'en' ? casesEn : casesDe;
  const caseStudy = casesData.find((c) => c.slug === slug);
  
  if (!caseStudy) {
    return createMetadata('Case Study Not Found');
  }

  return createMetadata(
    `${caseStudy.brand} Case Study | ${caseStudy.title}`,
    caseStudy.challenge.substring(0, 155),
    caseStudy.images[0]
  );
}

export default function CaseStudyDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  const casesData = locale === 'en' ? casesEn : casesDe;
  const caseStudy = casesData.find((c) => c.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
