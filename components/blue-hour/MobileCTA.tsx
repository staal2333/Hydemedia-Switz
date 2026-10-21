'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useConsent } from '@/components/consent/ConsentProvider';
import { track } from '@/lib/track';

const COPY = {
  de: { call: 'Anrufen', quote: 'Angebot anfordern', label: 'Hyde Media kontaktieren' },
  en: { call: 'Call', quote: 'Request a quote', label: 'Contact Hyde Media' },
} as const;

/**
 * Phone-only action bar. On a phone the contact links sit at the very end of
 * a long page; this keeps "call" and "quote" one tap away. It appears after
 * the hero, steps aside for the cookie banner and the footer, and is never
 * shown on the contact page itself.
 */
export default function MobileCTA() {
  const locale = useLocale();
  const pathname = usePathname();
  const { consent, ready } = useConsent();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setShow(window.scrollY > 560 && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const bannerOpen = !ready || consent === null;
  if (pathname.includes('/contact') || bannerOpen) return null;

  return (
    <nav
      aria-label={t.label}
      className={`md:hidden print:hidden fixed inset-x-0 bottom-0 z-50 px-3 pt-2 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-[120%]'}`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2 rounded-full bg-ink/90 backdrop-blur-xl p-1.5 shadow-[0_12px_32px_rgba(14,30,51,0.35)] border border-white/10">
        <a
          href="tel:+41772338121"
          className="flex-1 text-center py-3 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.1em] text-white border border-white/25"
        >
          {t.call}
        </a>
        <Link
          href={`/${locale}/contact`}
          onClick={() => track('click_quote', { location: 'mobile_bar' })}
          className="flex-[1.6] text-center py-3 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.1em] bg-cream text-dusk"
        >
          {t.quote} ↗
        </Link>
      </div>
    </nav>
  );
}
