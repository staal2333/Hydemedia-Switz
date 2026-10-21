'use client';

import { useConsent } from '@/components/consent/ConsentProvider';

/** Reopens the cookie settings — withdrawing consent must be as easy as giving it. */
export default function ConsentSettingsButton({ label, className }: { label: string; className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={
        className ??
        'print:hidden inline-flex items-center gap-2.5 mb-5 px-5 py-3 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] bg-ink text-white hover:bg-dusk transition-colors'
      }
    >
      {label}
    </button>
  );
}
