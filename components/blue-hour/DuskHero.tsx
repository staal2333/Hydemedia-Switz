'use client';

import { ReactNode } from 'react';

/**
 * Dusk hero — same Blue Hour atmosphere as the homepage TopStage:
 * twilight gradient, stars, crescent moon, soft clouds, sun glow.
 * Ends in #c6d8e8 so the GroundFlow wrapper that follows it picks up
 * seamlessly with no visible section seam.
 */
export default function DuskHero({ children, padded = true }: { children: ReactNode; padded?: boolean }) {
  return (
    <section
      className={`relative overflow-hidden text-white ${padded ? 'pt-28 pb-24 md:pt-36 md:pb-32' : ''}`}
      style={{
        background:
          'linear-gradient(180deg, #162a47 0%, #1f3a5f 14%, #2f578c 30%, #4a7bb5 48%, #7da8d1 66%, #a4c1de 84%, #c6d8e8 100%)',
      }}
    >
      {/* Warm sun glow + cool accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 12%, rgba(255,236,200,0.32) 0%, transparent 45%), radial-gradient(ellipse at 18% 78%, rgba(255,184,119,0.10) 0%, transparent 55%)',
        }}
      />

      {/* Fine noise grain — subtle, mix-blend-overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Stars — 15 dots scattered in the upper deep-navy band, with twinkle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          backgroundImage: [
            'radial-gradient(1.5px 1.5px at 8% 14%, rgba(255,236,200,0.95), transparent 60%)',
            'radial-gradient(1px 1px at 14% 22%, rgba(255,255,255,0.7), transparent 60%)',
            'radial-gradient(2px 2px at 22% 8%, rgba(255,236,200,0.85), transparent 60%)',
            'radial-gradient(1px 1px at 31% 18%, rgba(255,255,255,0.6), transparent 60%)',
            'radial-gradient(1.5px 1.5px at 39% 6%, rgba(255,255,255,0.9), transparent 60%)',
            'radial-gradient(1px 1px at 47% 24%, rgba(255,236,200,0.75), transparent 60%)',
            'radial-gradient(2px 2px at 55% 12%, rgba(255,255,255,0.95), transparent 60%)',
            'radial-gradient(1px 1px at 63% 9%, rgba(255,236,200,0.7), transparent 60%)',
            'radial-gradient(1.5px 1.5px at 71% 21%, rgba(255,255,255,0.85), transparent 60%)',
            'radial-gradient(1px 1px at 79% 7%, rgba(255,236,200,0.8), transparent 60%)',
            'radial-gradient(2px 2px at 86% 16%, rgba(255,255,255,0.9), transparent 60%)',
            'radial-gradient(1px 1px at 93% 11%, rgba(255,236,200,0.75), transparent 60%)',
            'radial-gradient(1.5px 1.5px at 4% 28%, rgba(255,255,255,0.6), transparent 60%)',
            'radial-gradient(1px 1px at 27% 32%, rgba(255,255,255,0.55), transparent 60%)',
            'radial-gradient(1px 1px at 68% 30%, rgba(255,236,200,0.55), transparent 60%)',
          ].join(','),
          animation: 'star-twinkle 6s ease-in-out infinite',
        }}
      />
      {/* Second twinkle layer offset for breathing effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          backgroundImage: [
            'radial-gradient(1px 1px at 11% 17%, rgba(255,236,200,0.9), transparent 60%)',
            'radial-gradient(1px 1px at 25% 13%, rgba(255,255,255,0.7), transparent 60%)',
            'radial-gradient(1px 1px at 42% 11%, rgba(255,236,200,0.85), transparent 60%)',
            'radial-gradient(1px 1px at 59% 19%, rgba(255,255,255,0.8), transparent 60%)',
            'radial-gradient(1px 1px at 76% 14%, rgba(255,236,200,0.75), transparent 60%)',
            'radial-gradient(1px 1px at 90% 22%, rgba(255,255,255,0.65), transparent 60%)',
          ].join(','),
          animation: 'star-twinkle 4.2s ease-in-out 1.4s infinite',
        }}
      />

      {/* Crescent moon — upper left */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '8%',
          left: '6%',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,236,200,0.85) 0%, rgba(255,236,200,0.4) 50%, transparent 70%)',
          boxShadow: '0 0 24px rgba(255,236,200,0.4)',
        }}
      />

      {/* Soft clouds — drift across the middle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[28%] bottom-[28%]"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 220px 60px at 18% 30%, rgba(255,255,255,0.28), transparent 70%)',
            'radial-gradient(ellipse 320px 80px at 64% 20%, rgba(255,255,255,0.18), transparent 70%)',
            'radial-gradient(ellipse 180px 50px at 88% 40%, rgba(255,255,255,0.22), transparent 70%)',
            'radial-gradient(ellipse 260px 70px at 38% 65%, rgba(255,255,255,0.14), transparent 75%)',
            'radial-gradient(ellipse 200px 55px at 78% 78%, rgba(255,255,255,0.12), transparent 75%)',
          ].join(','),
        }}
      />

      <div className="relative">{children}</div>
    </section>
  );
}
