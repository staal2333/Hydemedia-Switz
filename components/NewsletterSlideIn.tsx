'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useConsent } from '@/components/consent/ConsentProvider';
import { markDismissed, shouldOfferSlideIn } from '@/lib/newsletter';
import NewsletterSignup from './NewsletterSignup';

const COPY = {
  de: {
    pill: 'Neue Standorte zuerst',
    close: 'Newsletter-Anmeldung schliessen',
    label: 'Newsletter-Anmeldung',
  },
  en: {
    pill: 'New placements first',
    close: 'Close newsletter signup',
    label: 'Newsletter signup',
  },
} as const;

/** Share of the article read before the offer appears. */
const DEPTH = 0.6;

/** How far through the article the reader is, 0–1; the whole page if there is no article. */
function readProgress(): number {
  const article = document.querySelector('article');
  if (!article) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }
  const r = article.getBoundingClientRect();
  return r.height > 0 ? (window.innerHeight - r.top) / r.height : 0;
}

/** True while another signup form, the quote CTA or the footer is on screen. */
function somethingElseInView(): boolean {
  const targets = document.querySelectorAll('[data-newsletter-form]:not(aside [data-newsletter-form]), [data-quote-cta], footer');
  return Array.from(targets).some((el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });
}

/**
 * The newsletter offer inside articles, built so it never gets in the way:
 *
 * - It starts as a small pill in the corner, in the page margin beside the
 *   text, and only unfolds into the form when the reader clicks it.
 * - Wide screens only (1360px+), where the margin beside the text has room. On a
 *   phone it would cover the text, which Google also penalises.
 * - Appears after 60% of the article; hides while the inline form, the
 *   quote CTA or the footer is on screen; never while the cookie banner is
 *   open; gone for 30 days once closed, and for good once signed up.
 */
export default function NewsletterSlideIn({ source }: { source: string }) {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const { consent, ready } = useConsent();
  const [eligible, setEligible] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    setEligible(shouldOfferSlideIn());
  }, []);

  useEffect(() => {
    if (!eligible) return;
    const onScroll = () => {
      if (readProgress() >= DEPTH) setOpen(true);
      setCovered(somethingElseInView());
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [eligible]);

  const bannerOpen = !ready || consent === null;
  // Mounted only once open, so nothing unseen can take keyboard focus. While
  // covered it is display:none rather than unmounted, so a half-typed email survives.
  if (!eligible || bannerOpen || !open) return null;

  const close = () => {
    markDismissed();
    setEligible(false);
  };

  const shown = covered && !expanded ? '' : 'min-[1360px]:block';

  return (
    <aside aria-label={t.label} className={`hidden ${shown} print:hidden fixed bottom-6 right-6 z-50 hyde-slide-in`}>
      {expanded ? (
        <div className="relative w-[360px] bg-white border border-rule rounded-[20px] p-6 shadow-[0_24px_60px_rgba(14,30,51,0.22)]">
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="absolute top-3 right-3 h-8 w-8 rounded-full grid place-items-center text-ink-soft hover:bg-fog hover:text-ink transition-colors text-[18px]"
          >
            ×
          </button>
          <NewsletterSignup variant="compact" source={source} onDone={() => setTimeout(() => setEligible(false), 6000)} />
        </div>
      ) : (
        <div className="flex items-center gap-1 rounded-full bg-ink text-white pl-1.5 pr-1.5 py-1.5 shadow-[0_12px_32px_rgba(14,30,51,0.3)]">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={false}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <span aria-hidden className="h-6 w-6 rounded-full bg-glow text-dusk grid place-items-center text-[13px]">✉</span>
            <span className="font-ui font-semibold text-[11px] uppercase tracking-[0.12em]">{t.pill}</span>
          </button>
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="h-7 w-7 rounded-full grid place-items-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </aside>
  );
}
