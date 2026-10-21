/**
 * Sends a Google Analytics event. gtag only exists after the visitor has
 * accepted statistics cookies, so without consent this does nothing.
 */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
