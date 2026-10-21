'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import PlacementShowcase from '@/components/blue-hour/PlacementShowcase';

export default function ScaffoldingPageClient({ children }: { children?: ReactNode }) {
  const locale = useLocale();
  return (
    <PlacementShowcase
      kind="scaffolding"
      namespace="scaffolding"
      eyebrow={locale === 'en' ? 'Scaffolding advertising' : 'Gerüstwerbung'}
      stripWeekPrefix
    >
      {children}
    </PlacementShowcase>
  );
}
