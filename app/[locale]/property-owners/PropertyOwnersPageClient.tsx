'use client';

import Link from 'next/link';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const getBenefits = (locale: string) => [
  {
    key: 'income',
    title: locale === 'en' ? 'Additional income' : 'Zusätzliche Einnahmen',
    desc: locale === 'en'
      ? 'Earn from unused facades, gable walls and scaffolding. We take care of everything from A to Z, and you receive a fixed rental income.'
      : 'Verdienen Sie an ungenutzten Fassaden, Giebeln und Gerüsten. Wir kümmern uns um alles von A bis Z, Sie erhalten eine feste Mieteinnahme.',
  },
  {
    key: 'professional',
    title: locale === 'en' ? 'Professional handling' : 'Professionelle Abwicklung',
    desc: locale === 'en'
      ? 'Experienced installers, quality-checked printing, safe installation and proper removal. No risk of damage to your property.'
      : 'Erfahrene Monteure, qualitätsgeprüfter Druck, sichere Installation und fachgerechte Demontage. Kein Risiko für Schäden an Ihrer Immobilie.',
  },
  {
    key: 'permits',
    title: locale === 'en' ? 'Permits taken care of' : 'Bewilligungen erledigt',
    desc: locale === 'en'
      ? 'We handle official permits, resident notifications and legal requirements, so you can relax.'
      : 'Wir kümmern uns um behördliche Bewilligungen, Anwohnerinformation und gesetzliche Auflagen, damit Sie sich entspannen können.',
  },
  {
    key: 'flexible',
    title: locale === 'en' ? 'Flexible terms' : 'Flexible Konditionen',
    desc: locale === 'en'
      ? 'Short-term campaigns, seasonal rental or long-term contracts — we adapt to your property’s situation and your needs.'
      : 'Kurzzeitkampagnen, Saisonmiete oder Langzeitverträge — wir passen uns der Situation Ihrer Immobilie und Ihren Bedürfnissen an.',
  },
];

const getProcess = (locale: string) => [
  {
    n: 'i.',
    title: locale === 'en' ? 'Initial assessment' : 'Erste Einschätzung',
    desc: locale === 'en'
      ? 'We visit your property and assess its potential as an out-of-home advertising location — visibility, traffic and target audience.'
      : 'Wir besichtigen Ihre Immobilie und beurteilen ihr Potenzial als Aussenwerbe-Standort — Sichtbarkeit, Verkehr und Zielgruppe.',
  },
  {
    n: 'ii.',
    title: locale === 'en' ? 'Contract & permits' : 'Vertrag & Bewilligungen',
    desc: locale === 'en'
      ? 'We draw up a clear contract, obtain permits and notify residents in accordance with the municipality’s guidelines.'
      : 'Wir erstellen einen klaren Vertrag, holen Bewilligungen ein und informieren Anwohner gemäss den Richtlinien der Gemeinde.',
  },
  {
    n: 'iii.',
    title: locale === 'en' ? 'Campaign matching' : 'Kampagnen-Matching',
    desc: locale === 'en'
      ? 'We find brands that fit your location and target audience, and coordinate printing and production.'
      : 'Wir finden Marken, die zu Ihrem Standort und Ihrer Zielgruppe passen, und koordinieren Druck und Produktion.',
  },
  {
    n: 'iv.',
    title: locale === 'en' ? 'Installation & operation' : 'Installation & Betrieb',
    desc: locale === 'en'
      ? 'We install, maintain and remove the banners — you receive monthly documentation and rental income.'
      : 'Wir installieren, warten und entfernen die Banner — Sie erhalten monatlich Dokumentation und Mieteinnahmen.',
  },
];

const getWhy = (locale: string) => [
  {
    title: locale === 'en' ? 'No costs for you' : 'Keine Kosten für Sie',
    desc: locale === 'en'
      ? 'We cover printing, installation, permits and insurance. You pay nothing.'
      : 'Wir übernehmen Druck, Montage, Bewilligungen und Versicherung. Sie zahlen nichts.',
  },
  {
    title: locale === 'en' ? 'Fixed rental income' : 'Feste Mieteinnahme',
    desc: locale === 'en'
      ? 'A clear price from day one. No surprises, no hidden fees.'
      : 'Klarer Preis ab Tag eins. Keine Überraschungen, keine versteckten Gebühren.',
  },
  {
    title: locale === 'en' ? 'Local experience' : 'Lokale Erfahrung',
    desc: locale === 'en'
      ? 'Experienced in working with local authorities, owner associations and buildings in Basel and Zürich.'
      : 'Erfahren im Umgang mit lokalen Behörden, Eigentümergemeinschaften und Gebäuden in Basel und Zürich.',
  },
  {
    title: locale === 'en' ? 'Fast response' : 'Schnelle Reaktion',
    desc: locale === 'en'
      ? 'We respond to your enquiry within 24 hours.'
      : 'Wir melden uns innerhalb von 24 Stunden auf Ihre Anfrage.',
  },
];

export default function PropertyOwnersPageClient({ locale }: { locale: string }) {
  const BENEFITS = getBenefits(locale);
  const PROCESS = getProcess(locale);
  const WHY = getWhy(locale);

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {locale === 'en' ? 'For property owners' : 'Für Immobilieneigentümer'}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {locale === 'en' ? 'Earn from your' : 'Verdienen Sie an Ihrer'} <span className="italic text-cream">{locale === 'en' ? 'facade.' : 'Fassade.'}</span>
            </h1>
            <p className="font-body text-white/85 max-w-3xl mx-auto m-0 mb-8" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {locale === 'en'
                ? 'Hyde Media helps you rent out facades and scaffolding for advertising banners. We handle official requirements, resident notifications, design guidelines and all practical matters — and you receive a fixed rental income.'
                : 'Hyde Media hilft Ihnen, Fassaden und Gerüste für Werbebanner zu vermieten. Wir kümmern uns um behördliche Auflagen, Anwohnerinformation, Gestaltungsrichtlinien und alle praktischen Belange — Sie erhalten eine feste Mieteinnahme.'}
            </p>
            <Link
              href={`/${locale}/contact?inquiry=property`}
              className="inline-flex items-center gap-3 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
            >
              {locale === 'en' ? 'Rent out your facade' : 'Fassade vermieten'} <span>↗</span>
            </Link>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── BENEFITS ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mb-14">
            <span className="sec-no inline-block mb-4 text-mid">§ {locale === 'en' ? 'Benefits' : 'Vorteile'}</span>
            <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {locale === 'en' ? 'Why rent to' : 'Warum an'} <span className="italic text-mid">Hyde Media</span>{locale === 'en' ? '?' : ' vermieten?'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={b.key} className="bg-white border border-rule rounded-[20px] p-7">
                <div className="font-display italic font-normal text-mid mb-4" style={{ fontSize: 32, lineHeight: 1 }}>
                  0{i + 1}.
                </div>
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {b.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-ink-soft m-0">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24">
        <div className="shell">
          <div className="grid lg:grid-cols-[280px_1fr] grid-cols-1 gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-10 self-start">
              <span className="sec-no inline-block mb-4 text-mid">§ {locale === 'en' ? 'Process' : 'Ablauf'}</span>
              <h2 className="font-display italic font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {locale === 'en'
                  ? <>From viewing<br />to income.</>
                  : <>Von der Besichtigung<br />zur Einnahme.</>}
              </h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft mt-4 mb-0 max-w-md">
                {locale === 'en'
                  ? 'We handle the entire process. You only sign the contract and receive the rental income.'
                  : 'Den gesamten Ablauf übernehmen wir. Sie unterschreiben nur den Vertrag und erhalten die Mieteinnahme.'}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
              {PROCESS.map((s) => (
                <div key={s.n}>
                  <div className="font-display italic font-normal text-mid mb-3 inline-flex items-center gap-3" style={{ fontSize: 32, lineHeight: 1 }}>
                    {s.n}
                    <span aria-hidden className="block h-px w-10 bg-mid opacity-50" />
                  </div>
                  <h3 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0 max-w-md">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mb-14">
            <span className="sec-no inline-block mb-4 text-mid">§ {locale === 'en' ? 'Security' : 'Sicherheit'}</span>
            <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {locale === 'en' ? "What's in it" : 'Was haben Sie'} <span className="italic text-mid">{locale === 'en' ? 'for you?' : 'davon?'}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="bg-white border border-rule rounded-[20px] p-7">
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {w.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-ink-soft m-0">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-32 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
            backgroundSize: '120px 80px',
          }}
        />
        <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-12 items-center">
          <div>
            <h2
              className="font-display font-normal m-0 text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
            >
              {locale === 'en' ? "Let's talk" : 'Reden wir'} <span className="italic text-glow">{locale === 'en' ? 'about your facade.' : 'über Ihre Fassade.'}</span>
            </h2>
            <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
              {locale === 'en'
                ? 'Send us an address + photo, and we will get back to you within 24 hours with an assessment.'
                : 'Senden Sie Adresse + Foto, und wir melden uns innerhalb von 24 Stunden mit einer Einschätzung.'}
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <Link
              href={`/${locale}/contact?inquiry=property`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Get in touch' : 'Kontakt aufnehmen'}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
            <a
              href="tel:+41772338121"
              className="flex justify-between items-center px-6 py-5 bg-white/[0.06] backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/50 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[20px] text-white/85" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Call' : 'Anrufen'} 77 233 81 21</span>
              <span className="text-white/65 text-[18px]">→</span>
            </a>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
