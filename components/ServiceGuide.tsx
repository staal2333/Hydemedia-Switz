import Link from 'next/link';
import { getServiceGuide, type GuideKind } from '@/content/service-guides';

/** "[label](/path)" → link; everything else stays text. */
function withLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    return (
      <Link key={i} href={m[2]} className="text-mid underline underline-offset-2 hover:text-ink">
        {m[1]}
      </Link>
    );
  });
}

const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/**
 * Plain-language guide and FAQ for a service page, with FAQPage structured
 * data. Server-rendered, so the text is in the HTML that search engines and
 * answer engines read. Answers sit in <details>, but the text is present in
 * the markup whether or not a panel is open.
 */
export default function ServiceGuide({ kind, locale }: { kind: GuideKind; locale: string }) {
  const guide = getServiceGuide(kind, locale === 'en' ? 'en' : 'de');
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  };

  return (
    <section className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="shell">
      <div className="bg-white border border-rule rounded-[24px] p-7 md:p-12 grid lg:grid-cols-[1fr_1.15fr] grid-cols-1 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-display font-normal text-ink m-0 mb-6" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {guide.heading}
          </h2>
          <div className="flex flex-col gap-4">
            {guide.paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.7] text-ink-soft m-0">
                {withLinks(p)}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display font-normal text-ink m-0 mb-5" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', letterSpacing: '-0.025em' }}>
            {guide.faqHeading}
          </h2>
          <div className="border-t border-rule">
            {guide.faqs.map((f, i) => (
              <details key={i} className="group border-b border-rule" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-display text-[18px] text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-mid text-[22px] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="m-0 pb-5 text-[15px] leading-[1.7] text-ink-soft">{withLinks(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
