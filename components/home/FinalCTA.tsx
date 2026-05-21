'use client';

import { useTranslations, useLocale } from 'next-intl';
import UrgencyCTA from '@/components/UrgencyCTA';

export default function FinalCTA() {
  const t = useTranslations('home.finalCTA');
  const locale = useLocale();
  const isDanish = locale === 'da';

  return (
    <UrgencyCTA
      title={t('title')}
      subtitle={t('description')}
      primaryText={isDanish ? 'Kom I Gang Nu' : 'Get Started Now'}
      secondaryText={isDanish ? 'Ring Nu' : 'Call Now'}
      showUrgency={true}
    />
  );
}
