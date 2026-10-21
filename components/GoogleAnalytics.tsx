'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useConsent } from '@/components/consent/ConsentProvider';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

/**
 * Google Analytics, loaded only after the visitor has accepted statistics
 * cookies. Before that — or after a rejection — not a single request goes to
 * Google.
 */
export default function GoogleAnalytics() {
  const { consent } = useConsent();
  const allowed = Boolean(GA_MEASUREMENT_ID && consent?.statistics);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!allowed || !GA_MEASUREMENT_ID) return;
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
    }
  }, [allowed, pathname, searchParams]);

  // Phone and email links are leads too. One listener covers every link on
  // the site, including ones added later, without touching each component.
  useEffect(() => {
    if (!allowed) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
      if (!a || typeof window.gtag !== 'function') return;
      const href = a.getAttribute('href') ?? '';
      window.gtag('event', href.startsWith('tel:') ? 'click_call' : 'click_email', { page_path: window.location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [allowed]);

  if (!allowed) return null;

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `,
        }}
      />
    </>
  );
}
