'use client';

import { ReactNode } from 'react';

/**
 * Wraps every post-hero section in a single continuous gradient that runs
 * from the top of the atmosphere down to street level. Sections inside
 * render with transparent backgrounds — no visible seams.
 *
 * Three texture layers stack on top of the gradient to give visual depth:
 *   1) fine SVG noise grain (full-flow)
 *   2) horizontal atmospheric wisps (upper third)
 *   3) faint concrete speckle (lower third)
 */
export default function GroundFlow({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        background: [
          'linear-gradient(180deg,',
          '  #c6d8e8 0%,',
          '  #d4e0e9 6%,',
          '  #dde6ec 13%,',
          '  #e3eaef 20%,',
          '  #e6ecf0 28%,',
          '  #e6ebef 36%,',
          '  #e3e8ec 44%,',
          '  #dde2e7 52%,',
          '  #d4dade 62%,',
          '  #c5ccd2 72%,',
          '  #a3acb4 82%,',
          '  #6f7780 92%,',
          '  #4a525b 100%)',
        ].join(' '),
      }}
    >
      {/* ── Layer 1: fine grain across the whole flow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Layer 2: atmospheric horizontal wisps (upper third) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[35%] opacity-50"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 800px 80px at 20% 18%, rgba(255,255,255,0.18), transparent 65%)',
            'radial-gradient(ellipse 600px 60px at 78% 12%, rgba(255,255,255,0.14), transparent 65%)',
            'radial-gradient(ellipse 900px 70px at 45% 38%, rgba(255,255,255,0.10), transparent 70%)',
            'radial-gradient(ellipse 500px 50px at 88% 42%, rgba(255,255,255,0.12), transparent 70%)',
          ].join(','),
        }}
      />

      {/* ── Layer 3: faint concrete speckle (lower third) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
