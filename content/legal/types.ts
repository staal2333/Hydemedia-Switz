/**
 * Shape of the legal documents (privacy, cookies, terms of sale).
 *
 * Text supports two inline marks, kept deliberately small:
 *   **bold**            → <strong>
 *   [label](/path)      → link (internal paths starting with "/" or mailto:/https:)
 */
export type LegalBlock =
  | { p: string }
  | { ul: string[] }
  | { clauses: { n: string; text: string }[] }
  | { table: { head: string[]; rows: string[][] } }
  /** Renders the "change cookie settings" button on the cookie policy. */
  | { consentButton: string };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  eyebrow: string;
  title: string;
  /** Shown under the title, e.g. "Gültig ab 1. November 2026". */
  updated: string;
  intro?: string;
  tocLabel: string;
  /** Optional downloadable version of the same document. */
  pdf?: { href: string; label: string };
  sections: LegalSection[];
}

export type LegalDocs = { de: LegalDoc; en: LegalDoc };

/**
 * Company particulars, in one place so every document states them identically.
 *
 * legalName and uid are still to be confirmed for the Swiss company. Until
 * they are set, the documents name the trading name and the address only;
 * nothing renders a placeholder. Fill them in here and every document,
 * the press page and the footer pick them up.
 */
export const COMPANY: {
  legalName: string | null;
  tradingName: string;
  uid: string | null;
  street: string;
  postal: string;
  country: string;
  email: string;
  phone: string;
  web: string;
} = {
  legalName: null,
  tradingName: 'Hyde Media',
  uid: 'CHE-357.381.787',
  street: 'Marktgasse 8',
  postal: '4051 Basel',
  country: 'Schweiz',
  email: 'theodor.staal@hydemedia.ch',
  phone: '+41 77 233 81 21',
  web: 'www.hydemedia.ch',
};

/** "Hyde Media" or "Hyde Media (Muster AG)" once the legal name is known. */
export function companyName(): string {
  return COMPANY.legalName ? `${COMPANY.tradingName} (${COMPANY.legalName})` : COMPANY.tradingName;
}
