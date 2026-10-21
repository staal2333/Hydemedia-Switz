/**
 * Google Analytics 4 measurement ID for hydemedia.ch. Set
 * NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel to the Swiss property's ID; without
 * it, analytics stays off. The Danish site's ID is deliberately not reused, so
 * the two markets are never mixed in one report.
 */
export const GA_MEASUREMENT_ID: string | undefined = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;
