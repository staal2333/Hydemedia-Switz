import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { faq, plainText } from '@/content/faq';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const SITE = 'https://www.hydemedia.ch';

function pick(locale: string) {
  return faq[locale === 'en' ? 'en' : 'de'];
}

/** "[label](/path)" → link; everything else stays text. */
function withLinks(text: string, className = 'text-mid underline underline-offset-2 hover:text-ink') {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <Link key={i} href={m[2]} className={className}>
        {m[1]}
      </Link>
    ) : (
      part
    );
  });
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const de = locale !== 'en';
  return generateSEOMetadata({
    title: de ? 'FAQ: Gerüst- und Fassadenwerbung in der Schweiz' : 'FAQ: Scaffolding and Facade Advertising in Switzerland',
    description: de
      ? 'Antworten zu Buchung, Preisen, Reklamebewilligung, Druckdaten, Laufzeit und Annullierung von Gerüst- und Fassadenwerbung in Basel und der Schweiz.'
      : 'Answers on booking, prices, advertising permits, print files, campaign length and cancellation for scaffolding and facade advertising in Switzerland.',
    keywords: de
      ? 'FAQ Gerüstwerbung, FAQ Fassadenwerbung, Reklamebewilligung, Gerüstbanner Druckdaten, Aussenwerbung Basel'
      : 'scaffolding advertising FAQ, facade advertising FAQ, advertising permit Switzerland, banner print files, outdoor advertising Basel',
    path: '/faq',
    locale,
  });
}

export default function FAQPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const c = pick(locale);
  const url = `${SITE}/${locale}/faq`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    name: c.title,
    inLanguage: locale === 'en' ? 'en' : 'de-CH',
    mainEntity: c.groups.flatMap((g) =>
      g.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: plainText(item.a) },
      })),
    ),
  };

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
          <div className="shell">
            <div className="max-w-4xl mx-auto">
              <nav aria-label={c.jump} className="flex flex-wrap gap-2 mb-14">
                {c.groups.map((g) => (
                  <a
                    key={g.id}
                    href={`#${g.id}`}
                    className="px-3.5 py-1.5 rounded-full bg-white/80 border border-rule font-ui font-semibold text-[11px] tracking-[0.06em] text-ink-soft hover:text-ink hover:border-mid transition-colors"
                  >
                    {g.title}
                  </a>
                ))}
              </nav>

              {c.groups.map((g) => (
                <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28 mb-14">
                  <h2
                    id={`${g.id}-title`}
                    className="font-display font-normal text-ink m-0 mb-6"
                    style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
                  >
                    {g.title}
                  </h2>
                  <div className="space-y-3">
                    {g.items.map((item) => (
                      <details key={item.id} id={item.id} className="group scroll-mt-28 bg-white border border-rule rounded-[16px] overflow-hidden">
                        <summary className="cursor-pointer list-none p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-fog/40 transition-colors [&::-webkit-details-marker]:hidden">
                          <h3 className="font-display font-normal text-ink m-0" style={{ fontSize: 19, letterSpacing: '-0.015em', lineHeight: 1.35 }}>
                            {item.q}
                          </h3>
                          <span aria-hidden className="font-display italic text-mid text-[24px] leading-[1] shrink-0 group-open:rotate-45 transition-transform">
                            +
                          </span>
                        </summary>
                        <p className="m-0 px-5 md:px-6 pb-6 -mt-1 text-[15px] leading-[1.7] text-ink-soft">{withLinks(item.a)}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <p className="m-0 mb-6 bg-white/80 border border-rule rounded-[16px] px-5 py-4 text-[13.5px] leading-[1.6] text-ink-soft">{withLinks(c.note)}</p>

              <div className="rounded-[24px] bg-ink text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                <p className="m-0 flex-1 text-[17px] leading-[1.6] text-white/90">
                  {withLinks(c.cta, 'whitespace-nowrap text-white underline underline-offset-2 decoration-white/40 hover:decoration-white')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/${locale}/contact`}
                    className="text-center px-6 py-4 rounded-full bg-cream text-dusk font-ui font-semibold text-[12px] uppercase tracking-[0.1em] hover:bg-glow transition-colors"
                  >
                    {c.ctaButton}
                  </Link>
                  <Link
                    href={`/${locale}/standorte`}
                    className="text-center px-6 py-3.5 rounded-full border border-white/30 text-white font-ui font-semibold text-[11px] uppercase tracking-[0.1em] hover:bg-white/10 transition-colors"
                  >
                    {c.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
