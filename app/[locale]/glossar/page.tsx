import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { glossary } from '@/content/glossary';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const SITE = 'https://www.hydemedia.ch';

function pick(locale: string) {
  return glossary[locale === 'en' ? 'en' : 'de'];
}

/** "[label](/path)" → link. */
function withLinks(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <Link key={i} href={m[2]} className="text-mid underline underline-offset-2 hover:text-ink">
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
    title: de ? 'OOH-Glossar: Begriffe der Aussenwerbung erklärt' : 'OOH Glossary: Outdoor Advertising Terms Explained',
    description: de
      ? 'Was sind Kontakte, TKP, Gerüstwerbung oder eine Reklamebewilligung? Kurze, klare Erklärungen der Begriffe, die Ihnen beim Kauf von Aussenwerbung begegnen.'
      : 'What are contacts, CPM, scaffolding advertising or an advertising permit? Short, clear explanations of the terms you meet when buying outdoor advertising.',
    path: '/glossar',
    locale,
  });
}

export default function GlossaryPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const g = pick(locale);
  const url = `${SITE}/${locale}/glossar`;
  const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': url,
    name: g.title,
    url,
    hasDefinedTerm: g.terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${url}#${t.id}`,
      name: t.term,
      ...(t.aka ? { alternateName: t.aka } : {}),
      description: plain(t.body),
      inDefinedTermSet: url,
    })),
  };

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {g.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {g.title}
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {g.lede}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-16">
          <div className="shell max-w-5xl">
            <nav aria-label={g.jump} className="flex flex-wrap gap-2 mb-12">
              {g.terms.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="px-3.5 py-1.5 rounded-full bg-white/80 border border-rule font-ui font-semibold text-[11px] tracking-[0.06em] text-ink-soft hover:text-ink hover:border-mid transition-colors"
                >
                  {t.term}
                </a>
              ))}
            </nav>
            <dl className="grid md:grid-cols-2 grid-cols-1 gap-5 m-0">
              {g.terms.map((t) => (
                <div key={t.id} id={t.id} className="scroll-mt-28 bg-white border border-rule rounded-[20px] p-6 md:p-7">
                  <dt className="m-0 mb-2">
                    <span className="font-display text-ink text-[24px]" style={{ letterSpacing: '-0.02em' }}>{t.term}</span>
                    {t.aka && <span className="block font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted mt-1">{t.aka}</span>}
                  </dt>
                  <dd className="m-0 text-[15px] leading-[1.7] text-ink-soft">{withLinks(t.body)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
