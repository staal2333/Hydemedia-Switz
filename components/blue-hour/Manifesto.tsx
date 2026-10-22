'use client';

import { useLocale } from 'next-intl';

const valuesDe = [
  {
    n: 'i.',
    t: 'Erfahrung aus der Branche',
    p: 'Wir arbeiten seit Jahren mit Aussenwerbung und kennen die Regeln für Bewilligungen, Sicherheit und die Montage grosser Banner.',
  },
  {
    n: 'ii.',
    t: 'Ehrliche Angebote',
    p: 'Ein vollständiges Angebot innerhalb von 24 Stunden an Werktagen, in dem alles steht. Sie wissen, was Sie bekommen, bevor Sie zusagen.',
  },
  {
    n: 'iii.',
    t: 'Sauberes Handwerk',
    p: 'Wetterfester Druck und sichere Montage. Das Banner soll in der letzten Woche so gut aussehen wie am ersten Tag.',
  },
  {
    n: 'iv.',
    t: 'Nah an der Stadt',
    p: 'Wir arbeiten direkt mit Liegenschaftseigentümern in Basel zusammen und bieten so Flächen, die Sie anderswo nicht finden.',
  },
];

const valuesEn = [
  {
    n: 'i.',
    t: 'Experience from the industry',
    p: 'We have worked with outdoor advertising for years and know the rules for permits, safety and installing large banners.',
  },
  {
    n: 'ii.',
    t: 'Honest quotes',
    p: 'One complete quote within 24 hours on weekdays, with everything in it. You know what you get before you say yes.',
  },
  {
    n: 'iii.',
    t: 'Proper craft',
    p: 'Weatherproof print and safe installation. The banner should look as good in the last week as on the first day.',
  },
  {
    n: 'iv.',
    t: 'Close to the city',
    p: 'We work directly with property owners in Basel, so we can offer spaces you will not find elsewhere.',
  },
];

const COPY = {
  de: {
    values: valuesDe,
    kicker: 'Kapitel 01 · Über Hyde Media',
    side: ['Auf Vertrauen', 'gebaut seit', '2025.'],
    h4a: 'Wir machen es ',
    h4b: 'einfach, gross',
    h4c: ' in der Stadt aufzutreten.',
  },
  en: {
    values: valuesEn,
    kicker: 'Chapter 01 · About Hyde Media',
    side: ['Built on', 'trust since', '2025.'],
    h4a: 'We make it ',
    h4b: 'easy to be big',
    h4c: ' in the city.',
  },
};

export default function Manifesto() {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  return (
    <section id="om" className="py-14 md:py-32">
      <div className="shell">
        <div className="grid lg:grid-cols-[320px_1fr] grid-cols-1 gap-8 lg:gap-[72px]">
          {/* Side (sticky on desktop) */}
          <div className="lg:sticky lg:top-10 self-start">
            <div className="font-ui font-semibold text-[11px] tracking-[0.28em] uppercase text-mid mb-5">
              {t.kicker}
            </div>
            <h3 className="font-display italic font-normal m-0 text-ink" style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.025em' }}>
              {t.side[0]}<br />
              {t.side[1]}<br />
              {t.side[2]}
            </h3>
          </div>

          {/* Body */}
          <div>
            <h4
              className="font-display font-normal m-0 mb-12 max-w-[22ch] text-ink"
              style={{ fontSize: 'clamp(34px, 4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
            >
              {t.h4a}<span className="italic text-mid">{t.h4b}</span>{t.h4c}
            </h4>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-14 gap-y-10">
              {t.values.map((v) => (
                <div key={v.n}>
                  <div className="font-display italic font-normal text-mid mb-3.5 inline-flex items-center gap-3" style={{ fontSize: 36, lineHeight: 1 }}>
                    {v.n}
                    <span aria-hidden className="block h-px w-10 bg-mid opacity-50" />
                  </div>
                  <h5 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {v.t}
                  </h5>
                  <p className="text-[15px] leading-[1.65] text-ink-soft m-0 max-w-[42ch]">{v.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
