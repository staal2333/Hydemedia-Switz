'use client';

import { useLocale } from 'next-intl';

const values = [
  {
    n: 'i.',
    t: 'Nachgewiesene Expertise',
    p: 'Gegründet von Branchenveteranen mit fundiertem Wissen über Bewilligungen, Sicherheit und bauliche Anforderungen an Grossformat-Aussenwerbung.',
  },
  {
    n: 'ii.',
    t: 'Transparente Partnerschaft',
    p: 'Klare Kommunikation, ehrliche Preisgestaltung und engagierte Betreuung über die gesamte Kampagne hinweg. Keine Überraschungen — nur Resultate.',
  },
  {
    n: 'iii.',
    t: 'Qualität zuerst',
    p: 'Wir gehen niemals Kompromisse bei Materialien, Installationsstandards oder Sicherheit ein. Ihre Marke verdient nichts weniger als das Beste.',
  },
  {
    n: 'iv.',
    t: 'Langfristige Vision',
    p: 'Aufbau dauerhafter Beziehungen mit Immobilieneigentümern und Marken in der ganzen Schweiz. Ihr Erfolg ist unser Fundament.',
  },
];

const valuesEn: Record<string, { t: string; p: string }> = {
  'i.': {
    t: 'Proven expertise',
    p: 'Founded by industry veterans with in-depth knowledge of permits, safety and the structural requirements of large-format outdoor advertising.',
  },
  'ii.': {
    t: 'Transparent partnership',
    p: 'Clear communication, honest pricing and dedicated support throughout the entire campaign. No surprises — just results.',
  },
  'iii.': {
    t: 'Quality first',
    p: 'We never compromise on materials, installation standards or safety. Your brand deserves nothing less than the best.',
  },
  'iv.': {
    t: 'Long-term vision',
    p: 'Building lasting relationships with property owners and brands across Switzerland. Your success is our foundation.',
  },
};

export default function Manifesto() {
  const locale = useLocale();

  return (
    <section id="om" className="py-14 md:py-32">
      <div className="shell">
        <div className="grid lg:grid-cols-[320px_1fr] grid-cols-1 gap-8 lg:gap-[72px]">
          {/* Side (sticky on desktop) */}
          <div className="lg:sticky lg:top-10 self-start">
            <div className="font-ui font-semibold text-[11px] tracking-[0.28em] uppercase text-mid mb-5">
              {locale === 'en' ? 'Chapter 01 · About Hyde Media' : 'Kapitel 01 · Über Hyde Media'}
            </div>
            <h3 className="font-display italic font-normal m-0 text-ink" style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.025em' }}>
              {locale === 'en' ? (
                <>
                  Built on<br />
                  trust since<br />
                  2025.
                </>
              ) : (
                <>
                  Auf Vertrauen<br />
                  gebaut seit<br />
                  2025.
                </>
              )}
            </h3>
          </div>

          {/* Body */}
          <div>
            <h4
              className="font-display font-normal m-0 mb-6 max-w-[22ch] text-ink"
              style={{ fontSize: 'clamp(34px, 4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
            >
              {locale === 'en' ? (
                <>
                  Built on <span className="italic text-mid">trust, expertise</span> and a commitment to excellence.
                </>
              ) : (
                <>
                  Gebaut auf <span className="italic text-mid">Vertrauen, Expertise</span> und einem Bekenntnis zu Exzellenz.
                </>
              )}
            </h4>

            <p className="text-[17px] leading-[1.7] text-ink-soft m-0 mb-12 max-w-[52ch]">
              {locale === 'en' ? (
                <>
                  Hyde Media started in Denmark, where we specialised in high-impact large-format outdoor advertising. Now we are expanding into Switzerland — with <span className="italic text-mid">Basel</span> as our first location.
                </>
              ) : (
                <>
                  Hyde Media stammt aus Dänemark, wo wir uns auf wirkungsvolle Grossformat-Aussenwerbung spezialisiert haben. Jetzt expandieren wir in die Schweiz — mit <span className="italic text-mid">Basel</span> als unserem ersten Standort.
                </>
              )}
            </p>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-14 gap-y-10">
              {values.map((v) => (
                <div key={v.n}>
                  <div className="font-display italic font-normal text-mid mb-3.5 inline-flex items-center gap-3" style={{ fontSize: 36, lineHeight: 1 }}>
                    {v.n}
                    <span aria-hidden className="block h-px w-10 bg-mid opacity-50" />
                  </div>
                  <h5 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {locale === 'en' ? valuesEn[v.n].t : v.t}
                  </h5>
                  <p className="text-[15px] leading-[1.65] text-ink-soft m-0 max-w-[42ch]">{locale === 'en' ? valuesEn[v.n].p : v.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
