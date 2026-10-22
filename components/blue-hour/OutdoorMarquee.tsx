'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useEggsOptional } from './easter-eggs/EasterEggsProvider';

/**
 * PlaneBanner — a banner-towing plane crosses the sky where the dusk stage
 * meets the ground flow. Seen from the ground, so it is drawn in side profile:
 * a high-wing tail-dragger (the Super Cub type that tows real banners), with
 * the banner trailing behind on a sagging tow line.
 *
 * The banner is cut into vertical slices that bob out of phase, so a ripple
 * runs from the tow line to the free end, growing as it goes. Clicking the
 * plane makes the pilot waggle the wings and swaps the message.
 *
 * CSS animation only; nothing runs on the main thread after mount.
 */

const MESSAGES = {
  de: ['HYDE MEDIA', 'IHRE WERBUNG HIER?', 'IHRE MARKE AUF DER SKYLINE', 'ANRUFEN: 077 233 81 21'],
  en: ['HYDE MEDIA', 'YOUR AD HERE?', 'PUT YOUR BRAND ON THE SKYLINE', 'CALL +41 77 233 81 21'],
} as const;

const SLICE = 6; // px per banner slice; narrow enough to read as cloth

function Banner({ text }: { text: string }) {
  // Width follows the message so short and long texts both sit centred.
  const width = Math.max(168, Math.round(text.length * 10.5 + 44));
  const slices = Math.ceil(width / SLICE);
  return (
    <div className="relative flex shrink-0" style={{ width, height: 30 }}>
      {Array.from({ length: slices }).map((_, i) => {
        // i = 0 is the free end (left), the last slice is at the tow line.
        const fromLine = slices - 1 - i;
        const amp = 0.4 + Math.pow(fromLine / slices, 1.4) * 3.6;
        return (
          <div
            key={i}
            className="relative h-full overflow-hidden"
            style={{
              width: SLICE,
              animation: `banner-ripple 1.15s ease-in-out ${(-fromLine * 0.034).toFixed(3)}s infinite`,
              ['--amp' as string]: `${amp.toFixed(2)}px`,
            }}
          >
            <div
              className="absolute top-0 h-full flex items-center justify-center bg-dusk text-cream font-display italic font-bold whitespace-nowrap"
              style={{ left: -i * SLICE, width, fontSize: 13.5, letterSpacing: '0.08em' }}
            >
              {text}
            </div>
            {/* Shading: folds catch the last light on alternating slopes. */}
            <div
              className="absolute inset-0"
              style={{ animation: `banner-shade 1.15s ease-in-out ${(-fromLine * 0.034).toFixed(3)}s infinite` }}
            />
          </div>
        );
      })}
      {/* Leading pole the bridle attaches to */}
      <div className="absolute -right-[2px] -top-[3px] w-[2px] h-[36px] bg-ink/70 rounded-full" />
    </div>
  );
}

function Plane() {
  return (
    <svg width="92" height="44" viewBox="0 0 92 44" className="shrink-0 overflow-visible" aria-hidden>
      {/* Tow line: bridle at the tail, sagging back to the banner pole. */}
      <path d="M 8 24 Q -22 34 -54 25" fill="none" stroke="rgba(14,30,51,0.55)" strokeWidth="0.9" />
      {/* Horizontal stabiliser */}
      <path d="M 4 23.5 L 20 23 L 21 25 L 6 25.5 Z" fill="#26456d" />
      {/* Fuselage, tapering to the tail */}
      <path
        d="M 6 22.5 C 18 21 30 16.5 44 15.5 L 66 15 C 72 15 76 17 78 21 L 79 25 C 76 28.5 70 29.5 62 29.5 L 40 29.5 C 28 29 16 26.5 6 25.5 Z"
        fill="#1f3a5f"
      />
      {/* Brand stripe along the fuselage */}
      <path d="M 14 24.2 C 28 23.4 44 23 76 23.2 L 76.6 24.6 C 46 24.6 28 25 14 25.6 Z" fill="#ffb877" opacity="0.9" />
      {/* Fin and rudder */}
      <path d="M 5 22.8 L 9 9.5 C 10 8.5 12 8.5 13 9.5 L 19 21.4 Z" fill="#26456d" />
      {/* Cockpit glazing, catching the sky */}
      <path d="M 50 16 L 62 15.6 L 66.5 21.5 L 50.5 21.8 Z" fill="#a4c1de" opacity="0.85" />
      <path d="M 57 15.8 L 57.4 21.7" stroke="#1f3a5f" strokeWidth="0.8" />
      {/* High wing, seen edge-on, with its strut */}
      <rect x="41" y="12.2" width="30" height="3.4" rx="1.6" fill="#16304f" />
      <path d="M 47 15.4 L 58 28.6" stroke="#16304f" strokeWidth="1.1" />
      {/* Main gear and tailwheel */}
      <path d="M 62 29 L 59 36.5 M 66 29 L 64 36.5" stroke="#16304f" strokeWidth="1.2" />
      <circle cx="61" cy="37.5" r="3.1" fill="#0e1e33" />
      <circle cx="61" cy="37.5" r="1" fill="#6a7e9a" />
      <circle cx="10" cy="27.6" r="1.4" fill="#0e1e33" />
      {/* Spinner and propeller: a faint disc plus a blade that spins edge-on */}
      <path d="M 78 20.5 C 81 20.8 82.4 22 82.4 23 C 82.4 24 81 25.2 78.6 25.5 Z" fill="#c6d8e8" />
      <ellipse cx="82.6" cy="23" rx="1.4" ry="11" fill="rgba(198,216,232,0.28)" />
      <rect x="81.9" y="12" width="1.4" height="22" rx="0.7" fill="#0e1e33" opacity="0.75" style={{ transformOrigin: '82.6px 23px', animation: 'prop-spin 0.12s linear infinite' }} />
      {/* Lights: red beacon on the fin, white strobe on the wingtip */}
      <circle cx="11" cy="9.6" r="1.3" fill="#ff5a4e" style={{ animation: 'beacon-blink 1.6s ease-in-out infinite' }} />
      <circle cx="70.5" cy="13.8" r="1.1" fill="#ffffff" style={{ animation: 'strobe-blink 2.4s linear infinite' }} />
    </svg>
  );
}

/** Banner and plane as one unit, for pages that set their own text (e.g. the 404). */
export function TowedBanner({ text }: { text: string }) {
  return (
    <span className="flex items-center">
      <span className="mr-[52px]">
        <Banner text={text} />
      </span>
      <Plane />
    </span>
  );
}

export default function PlaneBanner() {
  const locale = useLocale();
  const messages = MESSAGES[locale === 'en' ? 'en' : 'de'];
  const [msg, setMsg] = useState(0);
  const [waggle, setWaggle] = useState(0);

  const { markFound } = useEggsOptional();
  const greet = () => {
    markFound('plane');
    setMsg((m) => (m + 1) % messages.length);
    setWaggle((w) => w + 1);
  };

  return (
    <section aria-hidden className="plane-lane relative overflow-hidden" style={{ height: 120 }}>
      <div
        className="plane-cross absolute left-0 will-change-transform"
        style={{ top: 30, animation: 'plane-cross 46s linear infinite' }}
      >
        <div style={{ animation: 'plane-bob 7s ease-in-out infinite' }}>
          <button
            type="button"
            tabIndex={-1}
            onClick={greet}
            className="flex items-center cursor-pointer bg-transparent p-0 border-0"
            style={{ minHeight: 0, minWidth: 0 }}
          >
            {/* key restarts the waggle animation on every click */}
            <span key={waggle} className="flex items-center" style={waggle ? { animation: 'wing-waggle 1.1s ease-in-out', transformOrigin: '85% 50%' } : undefined}>
              <span className="mr-[52px]">
                <Banner text={messages[msg]} />
              </span>
              <Plane />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
