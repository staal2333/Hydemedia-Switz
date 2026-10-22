'use client';

import { useEffect, useState } from 'react';
import { useEggsOptional, type DuskMode } from './EasterEggsProvider';

/**
 * More of the blue-hour sky, kept quiet enough for a premium brand:
 *   • DanishBalloon — a hot-air balloon in Danish colours drifts past and
 *     links to Hyde Media in Denmark.
 *   • HorizonMist — the city glow and banks of mist on the horizon.
 *   • Aurora — northern lights, only in midnight mode.
 *   • Snowfall — in December, and for a moment after someone types "hygge".
 *   • MoonPhase — the moon as it really is over Basel tonight.
 */

const DANISH_URL = 'https://www.hydemedia.dk';

function Balloon({ size = 1 }: { size?: number }) {
  return (
    <svg width={40 * size} height={60 * size} viewBox="0 0 40 60" className="block overflow-visible">
      <defs>
        <radialGradient id="balloon-shade" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e2303f" />
          <stop offset="70%" stopColor="#b8122a" />
          <stop offset="100%" stopColor="#7d0c1d" />
        </radialGradient>
      </defs>
      {/* Envelope */}
      <path d="M 20 0 C 33 0 40 9 40 20 C 40 31 30 38 25 44 L 15 44 C 10 38 0 31 0 20 C 0 9 7 0 20 0 Z" fill="url(#balloon-shade)" />
      {/* Gores */}
      <path d="M 20 0 C 13 9 13 33 17 44 M 20 0 C 27 9 27 33 23 44" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
      {/* Dannebrog: the Nordic cross, set towards the hoist */}
      <rect x="13" y="6" width="4.5" height="34" fill="#fff" />
      <rect x="2" y="18" width="36" height="4.5" fill="#fff" />
      {/* Ropes, burner glow and basket */}
      <path d="M 15.5 44 L 16.5 52 M 24.5 44 L 23.5 52" stroke="rgba(14,30,51,0.6)" strokeWidth="0.6" />
      <ellipse cx="20" cy="45.5" rx="2.4" ry="1.2" fill="#ffb877" style={{ animation: 'burner-glow 3.8s ease-in-out infinite' }} />
      <rect x="15.5" y="52" width="9" height="6" rx="1" fill="#5b4632" />
      <rect x="15.5" y="52" width="9" height="1.4" fill="#7a5f45" />
    </svg>
  );
}

export function DanishBalloon({ locale }: { locale: string }) {
  const en = locale === 'en';
  const copy = en
    ? { title: 'Hyde Media Denmark', body: 'Where it all began: scaffolding and facade advertising in Copenhagen and Aarhus.', cta: 'Visit hydemedia.dk' }
    : { title: 'Hyde Media Dänemark', body: 'Wo alles begann: Gerüst- und Fassadenwerbung in Kopenhagen und Aarhus.', cta: 'hydemedia.dk besuchen' };
  // Sits at z-7, above the hero section (z-5), whose box would otherwise
  // swallow the hover and the click. The card opens towards the middle of
  // the screen, so it is never cut off.
  const [flip, setFlip] = useState(false);
  const { markFound } = useEggsOptional();
  return (
    <div className="bh-motion pointer-events-none absolute inset-x-0 top-[13%] h-[140px] z-[7]">
      <div className="balloon-drift absolute left-0" style={{ animation: 'balloon-drift 170s linear -60s infinite' }}>
        <div style={{ animation: 'balloon-bob 11s ease-in-out infinite' }}>
          <a
            href={DANISH_URL}
            target="_blank"
            rel="noopener"
            aria-label={`${copy.title}: ${copy.body} ${copy.cta}`}
            onMouseEnter={(e) => { setFlip(e.currentTarget.getBoundingClientRect().left > window.innerWidth / 2); markFound('balloon'); }}
            onFocus={(e) => setFlip(e.currentTarget.getBoundingClientRect().left > window.innerWidth / 2)}
            className="group pointer-events-auto relative block opacity-90 hover:opacity-100 transition-opacity"
          >
            <Balloon size={0.9} />
            <span
              className={`absolute top-0 w-[230px] rounded-2xl bg-white/[0.16] backdrop-blur-xl border border-white/30 px-4 py-3 text-left shadow-[0_18px_40px_-16px_rgba(14,30,51,0.5)] invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100 transition-all duration-300 ${flip ? 'right-[46px] translate-x-1 group-hover:translate-x-0' : 'left-[46px] -translate-x-1 group-hover:translate-x-0'}`}
            >
              <span className="block font-ui font-semibold text-[10px] tracking-[0.2em] uppercase text-glow mb-1">{copy.title}</span>
              <span className="block font-body text-[13px] leading-[1.45] text-white">{copy.body}</span>
              <span className="block font-ui font-semibold text-[11px] tracking-[0.08em] uppercase text-cream mt-2">{copy.cta} ↗</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** A cloud bank as a seamless strip of soft puffs, twice the viewport wide. */
const MIST_PUFFS = [
  // Kept clear of the tile edges, so the repeat has no seam.
  'radial-gradient(ellipse 16% 58% at 18% 72%, rgba(255,255,255,VAL), transparent 70%)',
  'radial-gradient(ellipse 14% 50% at 34% 82%, rgba(255,255,255,VAL), transparent 70%)',
  'radial-gradient(ellipse 17% 62% at 50% 70%, rgba(255,255,255,VAL), transparent 70%)',
  'radial-gradient(ellipse 14% 52% at 66% 80%, rgba(255,255,255,VAL), transparent 70%)',
  'radial-gradient(ellipse 16% 58% at 82% 74%, rgba(255,255,255,VAL), transparent 70%)',
];

function MistLayer({ alpha, duration, reverse, bottom, height }: { alpha: number; duration: number; reverse?: boolean; bottom: string; height: string }) {
  const tile = MIST_PUFFS.map((p) => p.replace('VAL', String(alpha))).join(',');
  return (
    <div className="absolute left-0 flex" style={{ bottom, height, width: '200%', animation: `mist-drift ${duration}s linear infinite${reverse ? ' reverse' : ''}` }}>
      {/* Two identical halves, so the strip loops without a seam */}
      <div className="h-full w-1/2" style={{ backgroundImage: tile }} />
      <div className="h-full w-1/2" style={{ backgroundImage: tile }} />
    </div>
  );
}

/**
 * The horizon at blue hour: the warm glow of the city lights rising from
 * below, and banks of mist drifting slowly past at two depths.
 */
export function HorizonMist({ duskMode }: { duskMode: DuskMode }) {
  const glow = duskMode === 'daylight' ? 0.1 : duskMode === 'midnight' ? 0.34 : 0.28;
  return (
    <div aria-hidden className="bh-motion pointer-events-none absolute inset-x-0 bottom-0 h-[55%] -z-10 overflow-hidden">
      {/* City glow on the horizon, breathing very slowly */}
      <div
        className="absolute inset-x-0 bottom-0 h-full transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 100%, rgba(255,184,119,${glow}) 0%, rgba(255,184,119,${glow * 0.35}) 45%, transparent 75%)`,
          animation: 'city-glow 12s ease-in-out infinite',
        }}
      />
      <MistLayer alpha={0.24} duration={140} bottom="10%" height="45%" />
      <MistLayer alpha={0.32} duration={90} reverse bottom="-6%" height="40%" />
    </div>
  );
}

/** Northern lights: only after midnight (midnight mode). */
export function Aurora({ visible }: { visible: boolean }) {
  return (
    <div aria-hidden className="bh-motion pointer-events-none absolute inset-x-0 top-0 h-[55%] -z-10 transition-opacity duration-[1500ms]" style={{ opacity: visible ? 1 : 0 }}>
      <span className="aurora-band" style={{ top: '2%', left: '-6%', ['--aurora' as string]: '110,231,183' }} />
      <span className="aurora-band" style={{ top: '9%', left: '34%', width: '62%', animationDelay: '-7s', animationDuration: '18s', ['--aurora' as string]: '150,130,250' }} />
      <span className="aurora-band" style={{ top: '4%', left: '58%', width: '48%', animationDelay: '-3s', animationDuration: '22s', ['--aurora' as string]: '94,234,212' }} />
    </div>
  );
}

/** Deterministic flakes, so server and client agree. */
const FLAKES = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 37.3) % 100,
  size: 2 + ((i * 7) % 4),
  dur: 9 + ((i * 13) % 9),
  delay: -((i * 1.7) % 14),
  drift: ((i * 11) % 30) - 15,
}));

export function Snowfall({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div aria-hidden className="bh-motion pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      {FLAKES.map((f, i) => (
        <span
          key={i}
          className="absolute -top-3 rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: 0.75,
            filter: 'blur(0.4px)',
            ['--drift' as string]: `${f.drift}px`,
            animation: `snow-fall ${f.dur}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * After someone types "hygge": a balloon rises through the sky with a
 * greeting from the Danish office, and it snows for a while.
 */
export function DanishMoment({ at, locale }: { at: number; locale: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!at) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 11000);
    return () => clearTimeout(t);
  }, [at]);
  if (!show) return null;
  return (
    <>
      <Snowfall active />
      <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
        <div className="absolute left-1/2 bottom-0" style={{ animation: 'balloon-rise 11s ease-in-out forwards' }}>
          <a href={DANISH_URL} target="_blank" rel="noopener" className="pointer-events-auto relative block -translate-x-1/2">
            <Balloon size={1.6} />
            <span className="absolute left-[72px] top-[18px] whitespace-nowrap font-display italic text-[22px] text-cream" style={{ textShadow: '0 2px 18px rgba(14,30,51,0.4)' }}>
              Hej! <span className="font-ui not-italic text-[11px] tracking-[0.18em] uppercase text-white/80 ml-1">{locale === 'en' ? 'from Hyde Media Denmark' : 'von Hyde Media Dänemark'}</span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

/** Bursts: where, when and in which colour. Deterministic, so nothing jumps. */
const BURSTS = [
  // High in the sky, clear of the headline.
  { x: 30, y: 9, delay: 0, color: '255,214,140' },
  { x: 68, y: 14, delay: 0.7, color: '255,150,170' },
  { x: 50, y: 6, delay: 1.4, color: '160,220,255' },
  { x: 86, y: 24, delay: 2.1, color: '255,236,200' },
  { x: 42, y: 17, delay: 2.8, color: '190,255,210' },
  { x: 76, y: 7, delay: 3.4, color: '255,184,119' },
];
const SPARKS = 22;

/** Fireworks over the city, as over the Rhine on the Swiss National Day. */
export function Fireworks({ at }: { at: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!at) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 6500);
    return () => clearTimeout(t);
  }, [at]);
  if (!show) return null;
  return (
    <div aria-hidden key={at} className="bh-motion pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      {BURSTS.map((b, i) => (
        <div key={i} className="absolute" style={{ left: b.x + '%', top: b.y + '%' }}>
          {/* The rocket's climb */}
          <span className="fw-rocket" style={{ animationDelay: b.delay + 's', ['--c' as string]: b.color }} />
          {/* The flash where it bursts */}
          <span className="fw-flash" style={{ animationDelay: (b.delay + 0.55) + 's', ['--c' as string]: b.color }} />
          {Array.from({ length: SPARKS }).map((_, j) => {
            const a = (j / SPARKS) * Math.PI * 2;
            const r = 95 + (j % 3) * 22;
            return (
              <span
                key={j}
                className="fw-spark"
                style={{
                  animationDelay: (b.delay + 0.55) + 's',
                  ['--dx' as string]: Math.cos(a) * r + 'px',
                  ['--dy' as string]: Math.sin(a) * r + 'px',
                  ['--c' as string]: b.color,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Moon phase 0..1 (0 new, 0.5 full), from a known new moon. */
function moonPhase(d: Date): number {
  const synodic = 29.530588853;
  const knownNew = Date.UTC(2000, 0, 6, 18, 14);
  const days = (d.getTime() - knownNew) / 86400000;
  return (((days % synodic) + synodic) % synodic) / synodic;
}

function phaseName(p: number, en: boolean): string {
  if (p < 0.03 || p > 0.97) return en ? 'new moon' : 'Neumond';
  if (p < 0.47) return en ? 'waxing' : 'zunehmend';
  if (p < 0.53) return en ? 'full moon' : 'Vollmond';
  return en ? 'waning' : 'abnehmend';
}

/**
 * The moon as it is tonight. Lit side right while waxing, left while waning;
 * the terminator is half an ellipse whose width follows the phase.
 */
export function MoonPhase({ locale, onClick, daylight }: { locale: string; onClick: () => void; daylight: boolean }) {
  const en = locale === 'en';
  // Rendered after mount, so the server and client never disagree on the date.
  const [phase, setPhase] = useState<number | null>(null);
  useEffect(() => setPhase(moonPhase(new Date())), []);

  const r = 14;
  const p = phase ?? 0.18;
  const rx = Math.abs(r * Math.cos(2 * Math.PI * p));
  const waxing = p < 0.5;
  const limbSweep = waxing ? 1 : 0;
  const termSweep = waxing ? (p < 0.25 ? 0 : 1) : (p < 0.75 ? 0 : 1);
  const lit = `M 16 2 A ${r} ${r} 0 0 ${limbSweep} 16 30 A ${rx.toFixed(2)} ${r} 0 0 ${termSweep} 16 2 Z`;
  const pct = Math.round(((1 - Math.cos(2 * Math.PI * p)) / 2) * 100);
  const title = phase === null
    ? (en ? 'Change the time of day' : 'Tageszeit wechseln')
    : en
      ? `The moon over Basel tonight: ${phaseName(p, true)}, ${pct}% lit. Click to change the time of day.`
      : `Der Mond über Basel heute Abend: ${phaseName(p, false)}, ${pct} % beleuchtet. Klicken, um die Tageszeit zu wechseln.`;
  const glow = daylight ? 'rgba(255,255,255,0.8)' : '#ffecc8';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      title={title}
      className="absolute z-[6] rounded-full transition-transform duration-500 hover:scale-110"
      style={{ top: 'calc(8% - 6px)', left: 'calc(6% - 6px)', width: 44, height: 44, padding: 6, minHeight: 0, minWidth: 0, background: 'transparent' }}
    >
      <svg viewBox="0 0 32 32" width="32" height="32" className="block overflow-visible" style={{ filter: `drop-shadow(0 0 9px ${daylight ? 'rgba(255,255,255,0.5)' : 'rgba(255,236,200,0.55)'})` }}>
        {/* Earthshine: the dark part of the disc, faintly */}
        <circle cx="16" cy="16" r={r} fill="rgba(255,236,200,0.08)" />
        {pct > 1 && <path d={lit} fill={glow} />}
      </svg>
    </button>
  );
}
