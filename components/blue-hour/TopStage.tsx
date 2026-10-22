'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import StarsLayer from './easter-eggs/StarsLayer';
import SkyLife from './easter-eggs/SkyLife';
import { Aurora, DanishBalloon, DanishMoment, Fireworks, HorizonMist, MoonPhase, Snowfall } from './easter-eggs/SkyExtras';
import { DUSK_GRADIENTS, useEasterEggs } from './easter-eggs/EasterEggsProvider';


/**
 * Blue Hour top stage — twilight gradient with stars, moon, clouds, wind,
 * sun glow and the hero contents stacked on top. Gradient swaps live based
 * on duskMode (Konami code cycles it).
 */
export default function TopStage({ children }: { children: ReactNode }) {
  const { duskMode, cursor, cycleDusk, danishAt, fireworksAt, markFound } = useEasterEggs();
  const locale = useLocale();
  // Snow in December. Decided after mount so server and client agree.
  const [december, setDecember] = useState(false);
  useEffect(() => setDecember(new Date().getMonth() === 11), []);

  // Cursor parallax — clouds drift slightly toward cursor
  const cx = (cursor.x - 0.5) * 20;
  const cy = (cursor.y - 0.5) * 10;

  return (
    <div
      className="relative isolate overflow-hidden text-white pb-24 transition-[background] duration-700"
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

      {/* The moon as it is tonight. Click it to turn the clock: blue hour → day → midnight. */}
      <MoonPhase locale={locale} onClick={() => { cycleDusk(); markFound('moon'); }} daylight={duskMode === 'daylight'} />

      {/* Mist and city glow on the horizon and, after midnight, northern lights — behind everything */}
      <HorizonMist duskMode={duskMode} />
      <Aurora visible={duskMode === 'midnight'} />

      {/* A balloon from our Danish office; type "hygge" for a closer look */}
      <DanishBalloon locale={locale} />
      <DanishMoment at={danishAt} locale={locale} />
      <Snowfall active={december} />
      <Fireworks at={fireworksAt} />

      {/* Gulls, a meteor now and then */}
      <SkyLife />

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

      {/* Seamless hand-off: the glow and grain above tint the last pixels, so
          fade back to the exact colour GroundFlow starts with. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: 'linear-gradient(180deg, rgba(198,216,232,0) 0%, #c6d8e8 100%)' }}
      />
    </div>
  );
}
