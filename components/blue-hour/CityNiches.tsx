'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useEggsOptional } from './easter-eggs/EasterEggsProvider';

/**
 * Two "city niches" through GroundFlow:
 *   • CityHorizon — the Basel skyline at dusk (type "zürich" for Zürich): the
 *     Münster's two towers, the Messeturm, the Spalentor, the two Roche towers,
 *     the Mittlere Brücke over the Rhine, the Jura hills behind, a crane over a
 *     building site, and one scaffolded building carrying a Hyde banner.
 *   • GroundDatum — the street, where a cargo bike rides past now and then.
 *
 * Deterministic SVG; motion is CSS only and stops under reduced motion.
 */

const W = 1440;
const H = 160;
const BASE = H;

/** Deterministic 0..1 noise so server and client draw the same city. */
function rand(i: number, salt = 0): number {
  const h = (Math.imul(i + 11 + salt * 977, 2654435761) ^ Math.imul(i * 31 + salt + 7, 16777619)) >>> 0;
  return (h % 1000) / 1000;
}

type House = { x: number; w: number; h: number; roof: 'flat' | 'gable' | 'mansard' };

function houses(from: number, to: number, salt: number, minH: number, maxH: number): House[] {
  const out: House[] = [];
  let x = from;
  let i = 0;
  while (x < to) {
    const w = 34 + Math.round(rand(i, salt) * 30);
    const h = minH + Math.round(rand(i, salt + 1) * (maxH - minH));
    const r = rand(i, salt + 2);
    out.push({ x, w, h, roof: r < 0.45 ? 'gable' : r < 0.75 ? 'mansard' : 'flat' });
    x += w;
    i++;
  }
  return out;
}

function housePath({ x, w, h, roof }: House): string {
  const top = BASE - h;
  if (roof === 'gable') return `M ${x} ${BASE} V ${top} L ${x + w / 2} ${top - 12} L ${x + w} ${top} V ${BASE} Z`;
  if (roof === 'mansard') return `M ${x} ${BASE} V ${top} L ${x + 5} ${top - 8} H ${x + w - 5} L ${x + w} ${top} V ${BASE} Z`;
  return `M ${x} ${BASE} V ${top} H ${x + w} V ${BASE} Z`;
}

function windows(list: House[], salt: number) {
  const out: JSX.Element[] = [];
  list.forEach((b, bi) => {
    const cols = Math.floor((b.w - 8) / 8);
    const rows = Math.floor((b.h - 10) / 10);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = rand(bi * 97 + r * 13 + c, salt);
        if (n > 0.42) continue;
        // A few windows switch on and off, as people come and go.
        const flicker = n < 0.035;
        out.push(
          <rect
            key={`${salt}-${bi}-${r}-${c}`}
            x={b.x + 5 + c * 8}
            y={BASE - b.h + 7 + r * 10}
            width={3}
            height={4}
            fill="rgba(255,212,142,0.9)"
            style={flicker ? { animation: `win-flicker ${9 + Math.round(n * 200)}s steps(1) ${-Math.round(n * 900)}s infinite` } : undefined}
          />,
        );
      }
    }
  });
  return out;
}

const BACK = houses(0, W, 3, 22, 46);
const FRONT = [
  ...houses(0, 120, 5, 18, 34),
  ...houses(190, 330, 6, 20, 36),
  ...houses(390, 500, 7, 16, 30),
  ...houses(720, 820, 8, 18, 34),
  ...houses(930, 1000, 9, 18, 30),
  ...houses(1160, 1230, 10, 20, 34),
  ...houses(1270, 1330, 11, 16, 28),
];

const SILHOUETTE = 'url(#ch-front)';

export function CityHorizon() {
  const locale = useLocale();
  const en = locale === 'en';
  const yours = en ? 'YOUR BRAND?' : 'IHRE MARKE?';
  const { city, markFound } = useEggsOptional();
  // Click the crane and it hoists a banner up the skyline.
  const [hoist, setHoist] = useState(0);
  useEffect(() => {
    if (!hoist) return;
    const t = setTimeout(() => setHoist(0), 9000);
    return () => clearTimeout(t);
  }, [hoist]);
  const basel = city === 'basel';
  const fade = { transition: 'opacity 1.4s ease' };

  return (
    <div
      aria-hidden
      className="bh-motion skyline pointer-events-none relative w-full overflow-hidden"
      style={{
        height: 160,
        marginTop: -40,
        marginBottom: -24,
        // Dissolve the street end into the ground gradient: no hard edge.
        WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)',
        maskImage: 'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ch-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(84,106,130,0.14)" />
            <stop offset="100%" stopColor="rgba(84,106,130,0.24)" />
          </linearGradient>
          <linearGradient id="ch-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(58,80,106,0.30)" />
            <stop offset="100%" stopColor="rgba(58,80,106,0.46)" />
          </linearGradient>
        </defs>

        {/* The Jura hills, far behind the city */}
        <path d="M 980 160 L 980 112 Q 1060 92 1140 104 Q 1220 88 1300 100 Q 1380 90 1440 98 V 160 Z" fill="rgba(84,106,130,0.12)" />

        {/* Back row of roofs */}
        <g fill="url(#ch-back)">
          {BACK.map((b, i) => <path key={i} d={housePath({ ...b, h: b.h + 12 })} />)}
        </g>

        <g fill={SILHOUETTE}>
          {/* ── Basel ── */}
          <g style={{ ...fade, opacity: basel ? 1 : 0 }}>
            {/* Basler Münster: nave and its two Gothic towers, Georgsturm and Martinsturm */}
            <rect x="118" y="112" width="84" height="48" />
            <path d="M 118 112 L 160 98 L 202 112 Z" />
            <rect x="128" y="62" width="17" height="98" />
            <path d="M 127 62 L 136.5 26 L 146 62 Z" />
            <rect x="170" y="66" width="17" height="94" />
            <path d="M 169 66 L 178.5 32 L 188 66 Z" />
            <circle cx="160" cy="124" r="5" fill="rgba(255,212,142,0.45)" />

            {/* Messeturm: the slim tower by the fair grounds */}
            <rect x="346" y="22" width="26" height="138" />
            <rect x="357.5" y="10" width="1.2" height="12" />
            {[34, 46, 58, 70, 82, 94, 106, 118, 130, 142].map((y) => <rect key={y} x="349" y={y} width="20" height="1" fill="rgba(255,212,142,0.32)" />)}

            {/* Spalentor: the city gate, its steep tiled roof and two side towers */}
            <rect x="842" y="104" width="12" height="56" />
            <path d="M 841 104 L 848 92 L 855 104 Z" />
            <rect x="890" y="104" width="12" height="56" />
            <path d="M 889 104 L 896 92 L 903 104 Z" />
            <rect x="852" y="86" width="40" height="74" />
            <path d="M 850 86 L 872 50 L 894 86 Z" />
            <path d="M 863 160 V 136 A 9 9 0 0 1 881 136 V 160 Z" fill="rgba(14,30,51,0.35)" />

            {/* The Roche towers: Bau 1 and the taller Bau 2, stepping back as they rise */}
            <path d="M 1014 160 V 40 H 1024 V 24 H 1034 V 12 H 1046 V 160 Z" />
            <path d="M 1066 160 V 30 H 1076 V 14 H 1088 V 2 H 1102 V 160 Z" />
            {[50, 70, 90, 110, 130].map((y) => <rect key={`r1-${y}`} x="1018" y={y} width="24" height="1" fill="rgba(255,212,142,0.28)" />)}
            {[40, 60, 80, 100, 120, 140].map((y) => <rect key={`r2-${y}`} x="1070" y={y} width="28" height="1" fill="rgba(255,212,142,0.28)" />)}

            {/* Mittlere Brücke over the Rhine, with the Käppelijoch chapel */}
            <rect x="1196" y="140" width="160" height="5" />
            {[1206, 1238, 1270, 1302, 1334].map((x) => <path key={x} d={`M ${x} 160 V 150 A 10 6 0 0 1 ${x + 20} 150 V 160 Z`} fill="rgba(14,30,51,0.18)" />)}
            <rect x="1268" y="128" width="12" height="12" />
            <path d="M 1267 128 L 1274 118 L 1281 128 Z" />
          </g>

          {/* ── Zürich (type "zürich") ── */}
          <g style={{ ...fade, opacity: basel ? 0 : 1 }}>
            {/* Grossmünster: twin towers with their domed caps */}
            <rect x="118" y="112" width="84" height="48" />
            <rect x="130" y="58" width="18" height="102" />
            <path d="M 130 58 Q 139 36 148 58 Z" />
            <rect x="138.4" y="32" width="1.2" height="6" />
            <rect x="172" y="58" width="18" height="102" />
            <path d="M 172 58 Q 181 36 190 58 Z" />
            <rect x="180.4" y="32" width="1.2" height="6" />

            {/* St. Peter: the tower with Europe's largest church clock face */}
            <rect x="348" y="56" width="24" height="104" />
            <path d="M 346 56 L 360 18 L 374 56 Z" />
            <circle cx="360" cy="72" r="7" fill="rgba(255,236,200,0.75)" />
            <path d="M 360 72 L 360 67 M 360 72 L 364 72" stroke="rgba(14,30,51,0.7)" strokeWidth="0.9" />

            {/* Fraumünster: the slim green spire */}
            <rect x="842" y="112" width="70" height="48" />
            <rect x="864" y="70" width="14" height="90" />
            <path d="M 863 70 L 871 18 L 879 70 Z" />

            {/* Prime Tower: the glass tower in Zürich West */}
            <path d="M 1034 160 V 22 L 1046 14 L 1078 14 V 160 Z" />
            {[30, 46, 62, 78, 94, 110, 126, 142].map((y) => <rect key={y} x="1038" y={y} width="36" height="1" fill="rgba(160,220,255,0.35)" />)}

            {/* Uetliberg and its TV tower, on the hill behind the city */}
            <path d="M 1180 160 Q 1260 112 1356 132 V 160 Z" fill="rgba(84,106,130,0.22)" />
            <rect x="1281" y="66" width="2" height="54" />
            <path d="M 1279 120 L 1282 66 L 1285 120 Z" />
          </g>

          {/* Crane over a building site. Click it to hoist a banner. */}
          <g
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={() => { setHoist(Date.now()); markFound('crane'); }}
          >
            <rect x="512" y="18" width="166" height="70" fill="rgba(0,0,0,0)" />
            <rect x="566" y="34" width="4" height="126" />
            <path d="M 566 34 L 568 26 L 570 34 Z" />
            <g style={{ transformOrigin: '568px 36px', animation: 'crane-swing 26s ease-in-out infinite' }}>
              <rect x="520" y="34" width="150" height="3" />
              <rect x="520" y="37" width="20" height="7" />
              <rect x="623" y="37" width="1" height="38" style={{ animation: 'crane-cable 13s ease-in-out infinite', transformOrigin: '623px 37px' }} />
              <g style={{ animation: 'crane-load 13s ease-in-out infinite' }}>
                <rect x="620" y="74" width="7" height="4" />
                {/* The hoisted banner */}
                <g style={{ opacity: hoist ? 1 : 0, transform: hoist ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.8s ease, transform 1.6s cubic-bezier(0.2,0.8,0.2,1)' }}>
                  <line x1="616" y1="78" x2="631" y2="78" stroke="rgba(14,30,51,0.6)" strokeWidth="0.6" />
                  <rect x="603" y="79" width="41" height="15" fill="#1f3a5f" stroke="rgba(255,184,119,0.7)" strokeWidth="0.6" />
                  <text x="623.5" y="89.5" textAnchor="middle" fontSize="6.4" fontWeight="700" fontStyle="italic" fill="#ffecc8" letterSpacing="0.4">{yours.replace('?', '')}</text>
                </g>
              </g>
              <circle cx="668" cy="33" r="1.6" fill="#ff5a4e" style={{ animation: 'beacon-blink 2s ease-in-out infinite' }} />
            </g>
          </g>

          {/* Our building: scaffolded, carrying a Hyde banner */}
          <rect x="600" y="94" width="96" height="66" />
          <g stroke="rgba(30,48,72,0.55)" strokeWidth="0.8">
            {[592, 610, 628, 646, 664, 682, 700].map((x) => <line key={x} x1={x} y1="86" x2={x} y2="160" />)}
            {[90, 104, 118, 132, 146].map((y) => <line key={y} x1="592" y1={y} x2="700" y2={y} />)}
          </g>
          <g className="sky-banner" style={{ pointerEvents: 'auto' }} onMouseEnter={() => markFound('banner')}>
            <rect x="610" y="98" width="76" height="34" fill="#1f3a5f" />
            <rect x="610" y="98" width="76" height="34" fill="none" stroke="rgba(255,184,119,0.6)" strokeWidth="0.8" />
            <text className="sky-banner-a" x="648" y="120" textAnchor="middle" fontSize="13" fontStyle="italic" fontWeight="700" fill="#ffecc8" letterSpacing="1.5">HYDE</text>
            <text className="sky-banner-b" x="648" y="119" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffb877" letterSpacing="0.6">{yours}</text>
          </g>

          {/* Front row of houses */}
          {FRONT.map((b, i) => <path key={i} d={housePath(b)} />)}
        </g>

        <g>{windows(FRONT, 21)}</g>
      </svg>
    </div>
  );
}

export function GroundDatum() {
  const locale = useLocale();
  const bell = locale === 'en' ? 'Ring the bell' : 'Klingeln';
  return (
    <div aria-hidden className="pointer-events-none relative w-full overflow-hidden" style={{ height: 64, marginTop: -40, marginBottom: -8 }}>
      {/* Kerb line with survey ticks */}
      <div className="absolute inset-x-0 bottom-[20px] h-px" style={{ background: 'rgba(20,30,42,0.22)' }} />
      <svg
        className="absolute inset-x-0 bottom-[17px] w-full"
        style={{ height: 8, opacity: 0.2 }}
        viewBox="0 0 1440 8"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 29 }).map((_, i) => (
          <rect key={i} x={i * 50} y={3} width={1} height={3} fill="rgba(20,30,42,0.7)" />
        ))}
      </svg>
      {/* A cargo bike with a tiny billboard in the box. Click it to ring. */}
      <div className="bh-motion absolute bottom-[20px] left-0" style={{ animation: 'bike-ride 34s linear 3s infinite' }}>
        <CargoBike bell={bell} />
      </div>
    </div>
  );
}

function CargoBike({ bell }: { bell: string }) {
  const { markFound } = useEggsOptional();
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={bell}
      className="cargo-bike group relative block p-0 bg-transparent border-0 cursor-pointer"
      style={{ pointerEvents: 'auto', minHeight: 0, minWidth: 0 }}
      onClick={(e) => {
        markFound('bike');
        const el = e.currentTarget.querySelector('.bike-ding');
        el?.classList.remove('ringing');
        // Restart the ring animation on every click.
        void (el as HTMLElement | null)?.offsetWidth;
        el?.classList.add('ringing');
      }}
    >
      <span className="bike-ding absolute -top-5 right-1 font-display italic text-[11px] text-dusk/80 opacity-0 whitespace-nowrap">kling-kling</span>
      <svg width="76" height="38" viewBox="0 0 76 38" className="block overflow-visible">
        {/* Box with a mini billboard */}
        <path d="M 6 14 L 34 14 L 31 28 L 9 28 Z" fill="#1f3a5f" />
        <rect x="9" y="4" width="22" height="11" fill="#ffecc8" stroke="#1f3a5f" strokeWidth="1" />
        <text x="20" y="12" textAnchor="middle" fontSize="6" fontStyle="italic" fontWeight="700" fill="#1f3a5f">HYDE</text>
        {/* Frame */}
        <path d="M 34 22 L 50 22 L 58 31 M 50 22 L 46 12 M 44 12 L 50 12 M 58 31 L 62 14 M 59 14 L 66 13" fill="none" stroke="#0e1e33" strokeWidth="1.6" strokeLinecap="round" />
        {/* Rider */}
        <circle cx="49" cy="0" r="3.2" fill="#0e1e33" />
        <path d="M 49 3 L 46 12 M 48 6 L 61 13" stroke="#0e1e33" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 46 12 L 52 21 L 50 28" stroke="#0e1e33" strokeWidth="2" strokeLinecap="round" fill="none" style={{ transformOrigin: '50px 22px', animation: 'pedal 0.8s linear infinite' }} />
        {/* Wheels */}
        <g style={{ transformOrigin: '12px 31px', animation: 'wheel-spin 0.7s linear infinite' }}>
          <circle cx="12" cy="31" r="6" fill="none" stroke="#0e1e33" strokeWidth="1.5" />
          <path d="M 6 31 H 18 M 12 25 V 37" stroke="#0e1e33" strokeWidth="0.6" />
        </g>
        <g style={{ transformOrigin: '30px 31px', animation: 'wheel-spin 0.7s linear infinite' }}>
          <circle cx="30" cy="31" r="6" fill="none" stroke="#0e1e33" strokeWidth="1.5" />
          <path d="M 24 31 H 36 M 30 25 V 37" stroke="#0e1e33" strokeWidth="0.6" />
        </g>
        <g style={{ transformOrigin: '60px 31px', animation: 'wheel-spin 0.7s linear infinite' }}>
          <circle cx="60" cy="31" r="7" fill="none" stroke="#0e1e33" strokeWidth="1.5" />
          <path d="M 53 31 H 67 M 60 24 V 38" stroke="#0e1e33" strokeWidth="0.6" />
        </g>
      </svg>
    </button>
  );
}
