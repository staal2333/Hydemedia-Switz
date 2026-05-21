'use client';

import { useLocale } from 'next-intl';

export default function FinalCTA() {
  const locale = useLocale();

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden py-16 md:py-36 text-white"
    >
      {/* Concrete tile pattern — pavement texture sits over the GroundFlow gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
          backgroundSize: '120px 80px',
        }}
      />

      <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-16 items-center">
        <div>
          <div className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/70 mb-6">
            {locale === 'en' ? 'Reply within 24 hours' : 'Antwort innerhalb von 24 Stunden'}
          </div>
          <h2
            className="font-display italic font-normal m-0 text-white"
            style={{
              fontSize: 'clamp(52px, 7vw, 108px)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              textShadow: '0 2px 24px rgba(14,30,51,0.2)',
            }}
          >
            {locale === 'en' ? 'Ready' : 'Bereit'}
            <br />
            <span className="font-ui not-italic font-extrabold uppercase tracking-[-0.005em]" style={{ fontSize: '0.86em' }}>{locale === 'en' ? 'to get' : 'loszu-'}</span>
            <br />{locale === 'en' ? 'started?' : 'legen?'}
          </h2>
        </div>

        <div className="flex flex-col gap-3.5">
          {[
            { kind: locale === 'en' ? 'Call' : 'Anrufen', val: '+41 77 233 81 21', href: 'tel:+41772338121' },
            { kind: locale === 'en' ? 'Write' : 'Schreiben', val: 'theodor.staal@hydemedia.ch', href: 'mailto:theodor.staal@hydemedia.ch' },
            { kind: locale === 'en' ? 'Book' : 'Buchen', val: locale === 'en' ? 'Get started now' : 'Jetzt loslegen', href: `/${locale}/contact` },
          ].map((c) => (
            <a
              key={c.kind}
              href={c.href}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="flex items-center gap-4">
                <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-white/65">
                  {c.kind}
                </span>
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>
                  {c.val}
                </span>
              </span>
              <span className="text-glow text-[20px]">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
