/**
 * Cookie consent state.
 *
 * Analytics cookies are only set with prior, informed consent: Swiss data
 * protection law (revDSG) requires transparency, and visitors from the EU are
 * covered by the ePrivacy rules, which require consent before anything that
 * is not strictly necessary is stored on or read from their device. So nothing optional runs until a choice is stored here,
 * rejecting is exactly as easy as accepting, and the choice can be changed
 * at any time from the footer.
 *
 * The choice itself is kept in localStorage. Remembering a consent decision
 * is strictly necessary for honouring it, so it needs no consent of its own.
 */

export const CONSENT_STORAGE_KEY = 'hyde-consent';

/** Bump when the categories or their purposes change — everyone is asked again. */
export const CONSENT_VERSION = 1;

/** Consent is renewed after twelve months. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const CONSENT_EVENT = 'hyde-consent-change';

export interface ConsentState {
  version: number;
  /** Google Analytics. Off unless actively switched on. */
  statistics: boolean;
  /** ISO timestamp of the decision, kept so it can be documented and expired. */
  decidedAt: string;
}

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION || typeof parsed.statistics !== 'boolean' || !parsed.decidedAt) {
      return null;
    }
    const age = Date.now() - new Date(parsed.decidedAt).getTime();
    if (!Number.isFinite(age) || age > CONSENT_MAX_AGE_MS) return null;
    return parsed as ConsentState;
  } catch {
    // Storage blocked (private mode, strict settings): treat as undecided, so
    // nothing optional runs.
    return null;
  }
}

export function writeConsent(statistics: boolean): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    statistics,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The choice still applies for this page view even if it cannot persist.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

/**
 * Stops Google Analytics and removes the cookies it already set. Used when a
 * visitor withdraws consent — withdrawing must actually undo the tracking,
 * not just stop future page views.
 */
export function revokeAnalytics(measurementId: string | undefined): void {
  if (typeof window === 'undefined') return;
  if (measurementId) {
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  }
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!/^_ga(_|$)|^_gid$|^_gat/.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}
