'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CONSENT_EVENT, readConsent, revokeAnalytics, writeConsent, type ConsentState } from '@/lib/consent';
import CookieBanner from './CookieBanner';
import { GA_MEASUREMENT_ID as GA_ID } from '@/lib/analytics';

interface ConsentContextValue {
  /** null until the visitor has decided (or while reading storage). */
  consent: ConsentState | null;
  /** False on the server and the first client render, so nothing flashes. */
  ready: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (statistics: boolean) => void;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}


export default function ConsentProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
    // Keep several tabs in step: a choice made in one applies to all.
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentState>).detail);
    const onStorage = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const decide = useCallback((statistics: boolean) => {
    const previous = readConsent();
    const next = writeConsent(statistics);
    if (!statistics && previous?.statistics) revokeAnalytics(GA_ID);
    setConsent(next);
    setSettingsOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      acceptAll: () => decide(true),
      rejectAll: () => decide(false),
      save: (statistics) => decide(statistics),
      openSettings: () => setSettingsOpen(true),
    }),
    [consent, ready, decide],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && (
        <CookieBanner
          locale={locale}
          showBanner={consent === null}
          settingsOpen={settingsOpen}
          current={consent}
          onAcceptAll={value.acceptAll}
          onRejectAll={value.rejectAll}
          onSave={value.save}
          onOpenSettings={value.openSettings}
          onCloseSettings={() => setSettingsOpen(false)}
        />
      )}
    </ConsentContext.Provider>
  );
}
