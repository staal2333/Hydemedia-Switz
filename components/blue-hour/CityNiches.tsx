'use client';

/**
 * Two refined "city niches" through GroundFlow:
 *   • CityHorizon — distant skyline of building silhouettes with lit windows
 *   • GroundDatum — architectural baseline (hairline + tick marks) before street level
 *
 * Pointer-events-none, deterministic SVG, no images, no runtime JS.
 */

type Building = { x: number; w: number; h: number };

const CANVAS_W = 1440;
const CANVAS_H = 100;

const BUILDINGS: Building[] = [
  { x: 0,    w: 70, h: 26 },
  { x: 70,   w: 52, h: 38 },
  { x: 122,  w: 60, h: 30 },
  { x: 182,  w: 64, h: 46 },
  { x: 246,  w: 50, h: 34 },
  { x: 296,  w: 60, h: 52 },
  { x: 356,  w: 56, h: 38 },
  { x: 412,  w: 56, h: 54 },
  { x: 468,  w: 60, h: 40 },
  { x: 528,  w: 58, h: 44 },
  { x: 586,  w: 60, h: 34 },
  { x: 646,  w: 60, h: 50 },
  { x: 706,  w: 56, h: 38 },
  { x: 762,  w: 60, h: 56 },
  { x: 822,  w: 56, h: 42 },
  { x: 878,  w: 60, h: 48 },
  { x: 938,  w: 50, h: 36 },
  { x: 988,  w: 64, h: 52 },
  { x: 1052, w: 56, h: 40 },
  { x: 1108, w: 60, h: 46 },
  { x: 1168, w: 56, h: 36 },
  { x: 1224, w: 60, h: 54 },
  { x: 1284, w: 60, h: 42 },
  { x: 1344, w: 50, h: 46 },
  { x: 1394, w: 46, h: 36 },
];

const W_W = 3;
const W_H = 3;
const W_GX = 6;
const W_GY = 7;
const W_PAD = 5;

function isLit(bIdx: number, r: number, c: number): boolean {
  const h =
    (Math.imul(bIdx + 7, 2654435761) ^ Math.imul((r + 1) * 31 + c + 1, 16777619)) >>> 0;
  return h % 100 < 55;
}

function buildingWindows(b: Building, idx: number) {
  const cols = Math.max(0, Math.floor((b.w - 2 * W_PAD + W_GX) / (W_W + W_GX)));
  const rows = Math.max(0, Math.floor((b.h - 2 * W_PAD + W_GY) / (W_H + W_GY)));
  const totalW = cols > 0 ? cols * W_W + (cols - 1) * W_GX : 0;
  const offsetX = b.x + (b.w - totalW) / 2;
  const offsetY = (CANVAS_H - b.h) + W_PAD;
  const wins: JSX.Element[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!isLit(idx, r, c)) continue;
      wins.push(
        <rect
          key={`w-${idx}-${r}-${c}`}
          x={offsetX + c * (W_W + W_GX)}
          y={offsetY + r * (W_H + W_GY)}
          width={W_W}
          height={W_H}
          fill="rgba(255,212,142,0.88)"
        />
      );
    }
  }
  return wins;
}

export function CityHorizon() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full overflow-hidden"
      style={{ height: 100, marginTop: -28, marginBottom: -28 }}
    >
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="bh-bldg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(70,92,116,0.20)" />
            <stop offset="100%" stopColor="rgba(70,92,116,0.38)" />
          </linearGradient>
        </defs>
        <g>
          {BUILDINGS.map((b, i) => (
            <rect
              key={`b-${i}`}
              x={b.x}
              y={CANVAS_H - b.h}
              width={b.w}
              height={b.h}
              fill="url(#bh-bldg)"
            />
          ))}
        </g>
        <g>{BUILDINGS.flatMap((b, i) => buildingWindows(b, i))}</g>
      </svg>
    </div>
  );
}

export function GroundDatum() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full overflow-hidden"
      style={{ height: 24, marginTop: -8, marginBottom: -8 }}
    >
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: 'rgba(20,30,42,0.18)' }}
      />
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full"
        style={{ height: 8, opacity: 0.20 }}
        viewBox="0 0 1440 8"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 29 }).map((_, i) => (
          <rect key={i} x={i * 50} y={3} width={1} height={3} fill="rgba(20,30,42,0.7)" />
        ))}
      </svg>
    </div>
  );
}
