/**
 * Remembers, per browser, that a visitor closed or completed the newsletter
 * signup, so the slide-in is not shown to them again. Listed in the cookie
 * policy as "hyde-newsletter". Storage can be unavailable (private windows,
 * blocked site data), so every access is guarded and the default is to offer.
 */
export const NEWSLETTER_KEY = 'hyde-newsletter';
export const NEWSLETTER_EVENT = 'hyde-newsletter-change';
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000;

type State = { subscribed?: boolean; dismissedAt?: number };

function read(): State {
  try {
    const raw = window.localStorage.getItem(NEWSLETTER_KEY);
    return raw ? (JSON.parse(raw) as State) : {};
  } catch {
    return {};
  }
}

function write(state: State) {
  try {
    window.localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(state));
  } catch {
    /* storage blocked — the slide-in may simply show again next visit */
  }
  window.dispatchEvent(new Event(NEWSLETTER_EVENT));
}

export function markSubscribed() {
  write({ subscribed: true });
}

export function markDismissed() {
  write({ ...read(), dismissedAt: Date.now() });
}

/** False once signed up, and for 30 days after the slide-in was closed. */
export function shouldOfferSlideIn(): boolean {
  const s = read();
  if (s.subscribed) return false;
  return !(s.dismissedAt && Date.now() - s.dismissedAt < DISMISS_MS);
}
