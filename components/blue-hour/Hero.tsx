'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';

// 3D scaffold runs in the browser only — never on the server.
const Hero3DScaffold = dynamic(() => import('./Hero3DScaffold'), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero — single left column for all text & CTAs, 3D scene in its own
 * column on the right. No overlap; the text and the model never compete
 * for the same horizontal space.
 */
export default function Hero() {
  const locale = useLocale();

  return (
    <section className="relative z-[5] pt-12 md:pt-16">
      <div className="shell">
        {/* Stage — flex/grid keeps text left, 3D right, no overlap */}
        <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] grid-cols-1 gap-8 lg:gap-12 lg:min-h-[680px] items-start">
          {/* LEFT: text + lede + CTAs */}
          <div className="relative z-10 flex flex-col">
            {/* Headline */}
            <h1
              className="font-display font-normal text-white"
              style={{
                fontSize: 'clamp(44px, 6vw, 104px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textShadow: '0 2px 24px rgba(14,30,51,0.2)',
              }}
            >
              <span className="font-ui font-extrabold uppercase tracking-[-0.01em] text-[0.88em] inline-block">
                Impact
              </span>
              <br />
              {locale === 'en' ? 'you ' : 'den man '}<span className="italic text-cream">{locale === 'en' ? "won't" : 'nicht'}</span>
              <br />
              <span className="italic">{locale === 'en' ? 'forget.' : 'vergisst.'}</span>
            </h1>

            {/* Lede */}
            <p
              className="italic mt-10 max-w-[36ch] text-white/90"
              style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', lineHeight: 1.4, letterSpacing: '-0.005em' }}
            >
              <span
                className="font-display italic float-left text-glow leading-none pr-1"
                style={{ fontSize: '1.5em', fontWeight: 400 }}
              >
                G
              </span>
              {locale === 'en'
                ? 'rand-format scaffolding and facade advertising — from idea to reality.'
                : 'erüstwerbung und Fassadenwerbung im Grossformat — von der Idee zur Wirklichkeit.'}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                href={`/${locale}/brands`}
                className="group inline-flex items-center gap-3.5 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[13px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
              >
                {locale === 'en' ? 'For brands' : 'Für Marken'}
                <span className="inline-block h-px w-[22px] bg-current group-hover:w-9 transition-all" />
              </Link>
              <Link
                href={`/${locale}/property-owners`}
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-transparent text-white rounded-full border border-white/45 font-ui font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-white/10 hover:border-white transition-all"
              >
                {locale === 'en' ? 'For property owners' : 'Für Immobilieneigentümer'} →
              </Link>
            </div>
          </div>

          {/* RIGHT: bigger float in top-right on mobile, full column on desktop */}
          <div className="absolute -top-24 sm:-top-16 md:-top-12 -right-6 sm:-right-4 md:-right-2 w-[210px] h-[290px] sm:w-[260px] sm:h-[350px] md:w-[300px] md:h-[400px] lg:relative lg:top-auto lg:right-auto lg:w-auto lg:h-auto lg:min-h-[680px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform">
            <Hero3DScaffold variant="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
