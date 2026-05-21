import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PermitGuideClient from './PermitGuideClient';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'permitGuide' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: [
      'tilladelse stilladsreklame',
      'facadereklame tilladelse',
      'byggepladsreklame tilladelse',
      'outdoor reklame tilladelse',
      'reklameskilte tilladelse',
      'reklamebannere tilladelse København',
      'byggetilladelse reklame',
      'kommunal tilladelse reklame',
      'ansøgning stilladsreklame',
    ],
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'article',
    },
  };
}

export default function PermitGuidePage() {
  return <PermitGuideClient />;
}
