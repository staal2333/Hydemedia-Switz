'use client';

import { ReactNode } from 'react';
import StarsLayer from './easter-eggs/StarsLayer';
import { useEasterEggs } from './easter-eggs/EasterEggsProvider';

const DUSK_GRADIENTS = {
  'blue-hour': 'linear-gradient(180deg, #162a47 0%, #1f3a5f 14%, #2f578c 30%, #4a7bb5 48%, #7da8d1 66%, #a4c1de 84%, #c6d8e8 100%)',
  'daylight':  'linear-gradient(180deg, #6aa6d6 0%, #92c1e2 35%, #cfe1ef 65%, #c6d8e8 100%)',
  'midnight':  'linear-gradient(180deg, #050c1a 0%, #0b1d35 25%, #1f3a5f 55%, #3b6699 85%, #c6d8e8 100%)',
};

/**
 * Blue Hour top stage — twilight gradient with stars, moon, clouds, wind,
 * sun glow and the hero contents stacked on top. Gradient swaps live based
 * on duskMode (Konami code cycles it).
 */
export default function TopStage({ children }: { children: ReactNode }) {
  const { duskMode, cursor } = useEasterEggs();

  // Cursor parallax — clouds drift slightly toward cursor
  const cx = (cursor.x - 0.5) * 20;
  const cy = (cursor.y - 0.5) * 10;

  return (
    <div
      className="relative overflow-hidden text-white pb-24 transition-[background] duration-700"
      style={{ background: DUSK_GRADIENTS[duskMode] }}
    >
      {/* Warm/cool radial glow accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 15%, rgba(255,236,200,0.4) 0%, transparent 42%), radial-gradient(ellipse at 15% 85%, rgba(255,184,119,0.12) 0%, transparent 45%)',
        }}
      />

      {/* Fine noise grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Clickable stars + falling-star + constellation */}
      <StarsLayer />

      {/* Crescent moon */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '8%',
          left: '6%',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,236,200,0.85) 0%, rgba(255,236,200,0.4) 50%, transparent 70%)',
          boxShadow: '0 0 24px rgba(255,236,200,0.4)',
        }}
      />

      {/* Wind streaks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[20%] h-[40%] opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(15deg, transparent 0px, transparent 60px, rgba(255,255,255,0.06) 61px, rgba(255,255,255,0.02) 64px, transparent 65px, transparent 180px)',
          transform: `translate(${cx * 0.4}px, ${cy * 0.2}px)`,
          transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />

      {/* Soft clouds — drift toward cursor for parallax */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] bottom-[35%]"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 220px 60px at 18% 30%, rgba(255,255,255,0.32), transparent 70%)',
            'radial-gradient(ellipse 320px 80px at 64% 20%, rgba(255,255,255,0.22), transparent 70%)',
            'radial-gradient(ellipse 180px 50px at 88% 40%, rgba(255,255,255,0.28), transparent 70%)',
            'radial-gradient(ellipse 260px 70px at 38% 65%, rgba(255,255,255,0.18), transparent 75%)',
            'radial-gradient(ellipse 140px 40px at 8% 70%, rgba(255,255,255,0.20), transparent 70%)',
            'radial-gradient(ellipse 200px 55px at 78% 78%, rgba(255,255,255,0.16), transparent 75%)',
          ].join(','),
          transform: `translate(${cx}px, ${cy * 0.6}px)`,
          transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />

      {children}
    </div>
  );
}
