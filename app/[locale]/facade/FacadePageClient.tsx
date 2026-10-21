'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import PlacementShowcase from '@/components/blue-hour/PlacementShowcase';

export default function FacadePageClient({ children }: { children?: ReactNode }) {
  const locale = useLocale();
  return (
    <PlacementShowcase
      kind="facade"
      namespace="facade"
      eyebrow={locale === 'en' ? 'Facade advertising' : 'Fassadenwerbung'}
    >
      {children}
    </PlacementShowcase>
  );
}
