'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ConsentState } from '@/lib/consent';

const COPY = {
  de: {
    title: 'Wir verwenden Cookies',
    body:
      'Wir verwenden notwendige Cookies, damit die Website funktioniert. Mit Ihrer Einwilligung verwenden wir zudem Statistik-Cookies von Google Analytics, um zu verstehen, wie die Website genutzt wird. Sie können Ihre Wahl jederzeit unter «Cookie-Einstellungen» unten auf der Seite ändern.',
    policy: 'Cookie-Richtlinie lesen',
    reject: 'Ablehnen',
    accept: 'Alle akzeptieren',
    customise: 'Anpassen',
    settingsTitle: 'Cookie-Einstellungen',
    settingsIntro:
      'Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies können nicht abgewählt werden, weil die Website ohne sie nicht funktioniert.',
    necessary: 'Notwendig',
    necessaryBody: 'Speichert Ihre Cookie-Wahl. Kein Tracking, keine Einwilligung nötig.',
    alwaysOn: 'Immer aktiv',
    statistics: 'Statistik',
    statisticsBody:
      'Google Analytics misst anonym, welche Seiten besucht werden, damit wir die Website verbessern können. Die Daten werden von Google bearbeitet und können in die USA übermittelt werden.',
    save: 'Auswahl speichern',
    rejectAll: 'Alle ablehnen',
    close: 'Schliessen',
  },
  en: {
    title: 'We use cookies',
    body:
      'We use necessary cookies to make the website work. With your consent we also use statistics cookies from Google Analytics to understand how the site is used. You can change your choice at any time under “Cookie settings” at the bottom of the page.',
    policy: 'Read the cookie policy',
    reject: 'Reject',
    accept: 'Accept all',
    customise: 'Customise',
    settingsTitle: 'Cookie settings',
    settingsIntro:
      'Choose which cookies to allow. Necessary cookies cannot be switched off, because the website does not work without them.',
    necessary: 'Necessary',
    necessaryBody: 'Remember your cookie choice. No tracking, no consent required.',
    alwaysOn: 'Always on',
    statistics: 'Statistics',
    statisticsBody:
      'Google Analytics measures which pages are visited so we can improve the website. Data is processed by Google and may be transferred to the USA.',
    save: 'Save choice',
    rejectAll: 'Reject all',
    close: 'Close',
  },
} as const;

interface Props {
  locale: string;
  showBanner: boolean;
  settingsOpen: boolean;
  current: ConsentState | null;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: (statistics: boolean) => void;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
}

// Accept and reject share one style on purpose: Danish guidance requires that
// declining is as easy and as visible as accepting.
const decisionBtn =
  'inline-flex items-center justify-center px-5 py-3 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] bg-ink text-white hover:bg-dusk transition-colors min-w-[132px]';
const quietBtn =
  'inline-flex items-center justify-center px-5 py-3 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] text-ink border border-rule bg-white hover:border-mid transition-colors';

export default function CookieBanner(props: Props) {
  const t = COPY[props.locale === 'en' ? 'en' : 'de'];
  const policyHref = `/${props.locale === 'en' ? 'en' : 'de'}/cookies`;

  return (
    <>
      {props.showBanner && !props.settingsOpen && (
        <div
          role="region"
          aria-label={t.title}
          className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5 pointer-events-none print:hidden"
        >
          <div className="pointer-events-auto mx-auto max-w-3xl bg-white border border-rule rounded-[20px] shadow-[0_24px_60px_-20px_rgba(14,30,51,0.35)] p-5 sm:p-7">
            <h2 className="font-display font-normal text-ink m-0 mb-2" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {t.title}
            </h2>
            <p className="text-[14px] leading-[1.6] text-ink-soft m-0 mb-2">{t.body}</p>
            <Link href={policyHref} className="inline-block text-[13px] text-ink underline decoration-mid underline-offset-4 hover:text-mid mb-5">
              {t.policy}
            </Link>
            <div className="flex flex-wrap items-center gap-2.5">
              <button type="button" onClick={props.onRejectAll} className={decisionBtn}>
                {t.reject}
              </button>
              <button type="button" onClick={props.onAcceptAll} className={decisionBtn}>
                {t.accept}
              </button>
              <button type="button" onClick={props.onOpenSettings} className={quietBtn}>
                {t.customise}
              </button>
            </div>
          </div>
        </div>
      )}

      {props.settingsOpen && <SettingsDialog {...props} t={t} policyHref={policyHref} />}
    </>
  );
}

function SettingsDialog({
  t,
  policyHref,
  current,
  onSave,
  onAcceptAll,
  onRejectAll,
  onCloseSettings,
}: Props & { t: (typeof COPY)['de'] | (typeof COPY)['en']; policyHref: string }) {
  const [statistics, setStatistics] = useState<boolean>(current?.statistics ?? false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseSettings();
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onCloseSettings]);

  return (
    <div className="fixed inset-0 z-[70] print:hidden flex items-end sm:items-center justify-center p-3 sm:p-6 bg-[rgba(14,30,51,0.55)]">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        tabIndex={-1}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-[20px] border border-rule p-6 sm:p-8 outline-none"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 id="cookie-settings-title" className="font-display font-normal text-ink m-0" style={{ fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {t.settingsTitle}
          </h2>
          <button type="button" onClick={onCloseSettings} aria-label={t.close} className="text-muted hover:text-ink text-[22px] leading-none px-1">
            ×
          </button>
        </div>
        <p className="text-[14px] leading-[1.6] text-ink-soft m-0 mb-6">{t.settingsIntro}</p>

        <div className="flex flex-col gap-3 mb-6">
          <div className="border border-rule rounded-2xl p-4">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="font-ui font-semibold text-[13px] text-ink">{t.necessary}</span>
              <span className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted">{t.alwaysOn}</span>
            </div>
            <p className="text-[13px] leading-[1.55] text-ink-soft m-0">{t.necessaryBody}</p>
          </div>

          <label className="border border-rule rounded-2xl p-4 cursor-pointer hover:border-mid transition-colors block">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="font-ui font-semibold text-[13px] text-ink">{t.statistics}</span>
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={statistics}
                  onChange={(e) => setStatistics(e.target.checked)}
                />
                <span className="w-11 h-6 rounded-full bg-rule peer-checked:bg-mid transition-colors" />
                <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
              </span>
            </div>
            <p className="text-[13px] leading-[1.55] text-ink-soft m-0">{t.statisticsBody}</p>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <button type="button" onClick={onRejectAll} className={decisionBtn}>
            {t.rejectAll}
          </button>
          <button type="button" onClick={onAcceptAll} className={decisionBtn}>
            {t.accept}
          </button>
          <button type="button" onClick={() => onSave(statistics)} className={quietBtn}>
            {t.save}
          </button>
        </div>
        <Link href={policyHref} onClick={onCloseSettings} className="text-[13px] text-ink underline decoration-mid underline-offset-4 hover:text-mid">
          {t.policy}
        </Link>
      </div>
    </div>
  );
}
