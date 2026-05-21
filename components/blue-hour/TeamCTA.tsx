'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

/**
 * Team CTA — full-width image card at the bottom of the homepage
 * (before the FinalCTA) inviting visitors to read the About page.
 */
export default function TeamCTA() {
  const locale = useLocale();

  return (
    <section className="relative py-12 md:py-20">
      <div className="shell">
        <Link
          href={`/${locale}/about`}
          className="group relative block rounded-[24px] overflow-hidden border border-rule hover:-translate-y-1 transition-transform"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src="/images/about/Team switz.png"
              alt={locale === 'en' ? 'Hyde Media — the team behind it' : 'Hyde Media — das Team dahinter'}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover scale-110 blur-xl"
            />
            {/* Bottom gradient for readability */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(14,30,51,0.05) 0%, rgba(14,30,51,0.20) 50%, rgba(14,30,51,0.78) 100%)',
              }}
            />

            {/* Content overlay — bottom left */}
            <div className="absolute inset-0 flex items-end">
              <div className="px-8 md:px-14 pb-8 md:pb-12 text-white max-w-3xl">
                <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-glow inline-block mb-4">
                  {locale === 'en' ? '§ Meet the team' : '§ Das Team kennenlernen'}
                </span>
                <h2
                  className="font-display font-normal m-0 mb-3"
                  style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', lineHeight: 1, letterSpacing: '-0.03em', textShadow: '0 2px 24px rgba(14,30,51,0.4)' }}
                >
                  {locale === 'en' ? 'The people ' : 'Die Menschen '}<span className="italic text-cream">{locale === 'en' ? 'behind the banners.' : 'hinter den Bannern.'}</span>
                </h2>
                <p className="font-body text-white/90 m-0 mb-5 max-w-lg" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.55 }}>
                  {locale === 'en'
                    ? 'Hyde Media was built by two people — Mads and Sebastian. With the vision to bring innovation and transparency to the out-of-home industry and to expand into new countries.'
                    : 'Hyde Media wurde von zwei Personen aufgebaut — Mads und Sebastian. Mit der Vision, Innovation und Transparenz in die Out-of-Home-Branche zu bringen und in neue Länder zu expandieren.'}
                </p>
                <span className="inline-flex items-center gap-3 px-6 py-3 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] group-hover:bg-glow transition-colors">
                  {locale === 'en' ? 'About us' : 'Über uns'} <span>↗</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
