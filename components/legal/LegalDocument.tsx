import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import ConsentSettingsButton from './ConsentSettingsButton';
import type { LegalBlock, LegalDoc } from '@/content/legal/types';

/** **bold** and [label](href) — nothing more, so documents stay plain data. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={key++} className="font-semibold text-ink">{m[1]}</strong>);
    } else {
      const href = m[3];
      const cls = 'text-ink underline decoration-mid underline-offset-4 hover:text-mid break-words';
      out.push(
        href.startsWith('/') ? (
          <Link key={key++} href={href} className={cls}>{m[2]}</Link>
        ) : (
          <a key={key++} href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {m[2]}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ block }: { block: LegalBlock }) {
  if ('p' in block) {
    return <p className="text-[15.5px] leading-[1.75] text-ink-soft m-0 mb-4 print:text-[10.5pt] print:text-black">{inline(block.p)}</p>;
  }
  if ('ul' in block) {
    return (
      <ul className="m-0 mb-5 p-0 list-none flex flex-col gap-2">
        {block.ul.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15.5px] leading-[1.7] text-ink-soft print:text-[10.5pt] print:text-black">
            <span aria-hidden className="text-mid shrink-0 leading-[1.7]">—</span>
            <span>{inline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  if ('clauses' in block) {
    return (
      <ol className="m-0 mb-5 p-0 list-none flex flex-col gap-3">
        {block.clauses.map((c) => (
          <li key={c.n} className="grid grid-cols-[3rem_1fr] gap-2 text-[15.5px] leading-[1.7] text-ink-soft print:text-[10.5pt] print:text-black print:break-inside-avoid">
            <span className="font-ui font-semibold text-[12px] tracking-[0.06em] text-muted pt-[3px] print:text-black">{c.n}</span>
            <span>{inline(c.text)}</span>
          </li>
        ))}
      </ol>
    );
  }
  if ('table' in block) {
    return (
      <div className="mb-6 overflow-x-auto rounded-2xl border border-rule print:rounded-none">
        <table className="w-full min-w-[560px] border-collapse text-left text-[14px] print:text-[9pt] print:min-w-0">
          <thead>
            <tr className="bg-fog/60">
              {block.table.head.map((h) => (
                <th key={h} className="font-ui font-semibold text-[10.5px] tracking-[0.14em] uppercase text-muted px-4 py-3 border-b border-rule print:text-black">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, i) => (
              <tr key={i} className="align-top">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 border-b border-rule last:border-b-0 leading-[1.55] ${j === 0 ? 'font-mono text-[13px] text-ink whitespace-nowrap' : 'text-ink-soft'} print:text-black`}>
                    {inline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <ConsentSettingsButton label={block.consentButton} />;
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <div className="relative legal-doc">
      <div className="print:hidden">
        <DuskHero>
          <div className="shell">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {doc.eyebrow}</span>
              <h1
                className="font-display font-normal text-white m-0 mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
              >
                {doc.title}
              </h1>
              <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-white/60 m-0">{doc.updated}</p>
            </div>
          </div>
        </DuskHero>
      </div>

      {/* Print header — the dusk hero is white-on-gradient and would print blank. */}
      <header className="hidden print:block mb-8 pb-4 border-b border-black">
        <div className="font-ui font-semibold text-[9pt] tracking-[0.2em] uppercase">Hyde Media · 2W ApS · CVR 45 37 73 93</div>
        <div className="font-display text-[22pt] leading-tight m-0 mt-3">{doc.title}</div>
        <p className="text-[9pt] m-0 mt-1">{doc.updated}</p>
      </header>

      <GroundFlow>
        <article className="py-20 print:py-0">
          <div className="shell print:px-0">
            <div className="max-w-3xl mx-auto">
              {doc.intro && <p className="text-[17px] leading-[1.7] text-ink m-0 mb-8 print:text-[11pt] print:text-black">{inline(doc.intro)}</p>}

              {doc.pdf && (
                <a
                  href={doc.pdf.href}
                  download
                  className="print:hidden inline-flex items-center gap-2.5 mb-10 px-5 py-3 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] text-ink border border-rule bg-white hover:border-mid transition-colors"
                >
                  {doc.pdf.label} <span aria-hidden>↓</span>
                </a>
              )}

              <nav aria-label={doc.tocLabel} className="print:hidden mb-12 bg-white border border-rule rounded-[20px] p-6">
                <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted mb-3">{doc.tocLabel}</div>
                <ol className="m-0 p-0 list-none grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-[14px] text-ink-soft hover:text-mid transition-colors">{s.heading}</a>
                    </li>
                  ))}
                </ol>
              </nav>

              {doc.sections.map((s) => (
                <Fragment key={s.id}>
                  <section id={s.id} className="scroll-mt-28 mb-10 print:mb-6">
                    <h2
                      className="font-display font-normal text-ink m-0 mb-4 print:text-[13pt] print:text-black print:break-after-avoid"
                      style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                    >
                      {s.heading}
                    </h2>
                    {s.blocks.map((b, i) => (
                      <Block key={i} block={b} />
                    ))}
                  </section>
                </Fragment>
              ))}
            </div>
          </div>
        </article>
      </GroundFlow>
    </div>
  );
}
