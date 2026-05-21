import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blogListing' });
  
  return {
    title: `${t('title')} | Hyde Media`,
    description: t('description'),
  };
}

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <BlogPageClient />;
}
