'use client';

import { useLocale } from 'next-intl';

/**
 * Trust strip — 4 glass tiles inside the Blue Hour stage.
 * Sits at the bottom of the hero, before transitioning out of the dusk gradient.
 */
export default function TrustStrip() {
  const locale = useLocale();

  const items = [
    { k: locale === 'en' ? 'Response' : 'Reaktion', v: <>{locale === 'en' ? 'Within ' : 'Innerhalb von '}<span className="font-ui not-italic font-medium text-[20px] tracking-[-0.005em]">{locale === 'en' ? '24 hours' : '24 Stunden'}</span></> },
    { k: locale === 'en' ? 'Coverage' : 'Abdeckung', v: <>{locale === 'en' ? 'All of ' : 'Die ganze '}<em className="font-italic italic text-glow">{locale === 'en' ? 'Switzerland' : 'Schweiz'}</em></> },
    { k: locale === 'en' ? 'All inclusive' : 'Alles inklusive', v: <span className="font-ui not-italic font-medium text-[20px] tracking-[-0.005em]">Design · Permit · Install</span> },
  ];

  return (
    <div className="shell">
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 bg-white/[0.14] border border-white/30 backdrop-blur-xl text-white/95"
          >
            <div className="font-ui font-semibold text-[10px] tracking-[0.25em] uppercase text-white/70 mb-2.5">
              {it.k}
            </div>
            <div className="font-display italic text-white text-[26px] leading-[1.05] tracking-[-0.02em]">
              {it.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
