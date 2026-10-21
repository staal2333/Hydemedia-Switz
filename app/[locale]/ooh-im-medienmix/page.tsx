import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { oohMix } from '@/content/ooh-mix';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const SITE = 'https://www.hydemedia.ch';

function pick(locale: string) {
  return oohMix[locale === 'en' ? 'en' : 'de'];
}

/** "**lead.** rest" → bold lead. */
function withBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i} className="text-ink font-semibold">{part.slice(2, -2)}</strong> : part,
  );
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const de = locale !== 'en';
  return generateSEOMetadata({
    title: de ? 'Aussenwerbung im Medienmix: was sagen die Zahlen?' : 'Outdoor Advertising in the Media Mix: The Numbers',
    description: de
      ? 'Aussenwerbung wird vor der Suche gesehen, schafft Vertrauen und verstärkt TV, Social Media und Suche. Die wichtigsten Zahlen aus der Forschung, mit Quellen.'
      : 'Outdoor is seen before the search, builds trust and lifts TV, social and search. The key figures from the research, with sources.',
    path: '/ooh-im-medienmix',
    locale,
  });
}

export default function OohMixPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const c = pick(locale);
  const url = `${SITE}/${locale}/ooh-im-medienmix`;
  const plain = (t: string) => t.replace(/\*\*/g, '');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: c.title,
      description: c.lede,
      url,
      inLanguage: locale === 'en' ? 'en' : 'de-CH',
      author: { '@type': 'Organization', name: 'Hyde Media', url: SITE },
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    },
  ];

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {c.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {c.title}
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {c.lede}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-16">
          <div className="shell max-w-5xl">
            <div className="bg-white border border-rule rounded-[20px] p-6 md:p-8 mb-14">
              <h2 className="font-display text-ink text-[26px] m-0 mb-3" style={{ letterSpacing: '-0.02em' }}>{c.fitTitle}</h2>
              <p className="m-0 text-[15.5px] leading-[1.75] text-ink-soft">{c.fit}</p>
              <p className="m-0 mt-4 text-[13px] leading-[1.6] text-muted">{c.note}</p>
            </div>

            {c.sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28 mb-16">
                <h2 className="font-display text-ink m-0 mb-4" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                  {s.title}
                </h2>
                <p className="m-0 mb-7 max-w-3xl text-[16px] leading-[1.75] text-ink-soft">{s.body}</p>
                <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${s.stats.length === 3 ? 'lg:grid-cols-3' : s.stats.length >= 4 ? 'lg:grid-cols-4' : ''}`}>
                  {s.stats.map((st) => (
                    <figure key={st.label} className="m-0 bg-white border border-rule rounded-[20px] p-6 flex flex-col">
                      <span className="font-display text-mid" style={{ fontSize: 'clamp(36px, 3.6vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {st.value}
                      </span>
                      <figcaption className="mt-3 text-[14.5px] leading-[1.55] text-ink-soft flex-1">{st.label}</figcaption>
                      <span className="mt-4 font-ui font-semibold text-[10px] tracking-[0.14em] uppercase text-muted">{st.source}</span>
                    </figure>
                  ))}
                </div>
              </div>
            ))}

            <div className="mb-16">
              <h2 className="font-display text-ink m-0 mb-6" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                {c.howTitle}
              </h2>
              <ol className="m-0 pl-5 list-decimal marker:text-mid marker:font-semibold grid gap-3 text-[16px] leading-[1.7] text-ink-soft">
                {c.how.map((h) => <li key={h}>{withBold(h)}</li>)}
              </ol>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-ink m-0 mb-6" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                {c.faqTitle}
              </h2>
              <div className="grid gap-4">
                {c.faq.map((f) => (
                  <div key={f.q} className="bg-white border border-rule rounded-[20px] p-6">
                    <h3 className="font-display text-ink text-[20px] m-0 mb-2" style={{ letterSpacing: '-0.015em' }}>{f.q}</h3>
                    <p className="m-0 text-[15px] leading-[1.7] text-ink-soft">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-ink text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
              <p className="m-0 flex-1 text-[17px] leading-[1.6] text-white/90">{c.cta}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="text-center px-6 py-4 rounded-full bg-cream text-dusk font-ui font-semibold text-[12px] uppercase tracking-[0.1em] hover:bg-glow transition-colors"
                >
                  {c.ctaButton}
                </Link>
                <Link
                  href={`/${locale}/kampagnenrechner`}
                  className="text-center px-6 py-3.5 rounded-full border border-white/30 text-white font-ui font-semibold text-[11px] uppercase tracking-[0.1em] hover:bg-white/10 transition-colors"
                >
                  {c.calculator}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
