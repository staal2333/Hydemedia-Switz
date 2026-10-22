'use client';

/**
 * Life in the dusk sky: a few gulls crossing over the city on the Rhine, a second
 * flock further off, and a meteor every so often for whoever is watching.
 * Pure CSS animation, decorative only.
 */

function Gull({ x, y, scale, delay }: { x: number; y: number; scale: number; delay: number }) {
  return (
    <svg
      width={22 * scale}
      height={10 * scale}
      viewBox="0 0 22 10"
      className="absolute overflow-visible"
      style={{ left: x, top: y }}
    >
      <path
        d="M 1 5 Q 6 0.5 11 5.5 Q 16 0.5 21 5"
        fill="none"
        stroke="#16304f"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transformOrigin: '11px 5.5px', animation: `gull-flap 0.9s ease-in-out ${delay}s infinite` }}
      />
    </svg>
  );
}

function Flock({ top, duration, delay, opacity, size }: { top: string; duration: number; delay: number; opacity: number; size: number }) {
  return (
    <div
      className="absolute left-0"
      style={{ top, opacity, animation: `gulls-cross ${duration}s linear ${delay}s infinite` }}
    >
      <div className="relative" style={{ width: 120 * size, height: 50 * size, animation: 'gulls-drift 9s ease-in-out infinite' }}>
        <Gull x={0} y={14 * size} scale={size} delay={0} />
        <Gull x={26 * size} y={2 * size} scale={size * 0.9} delay={-0.3} />
        <Gull x={50 * size} y={20 * size} scale={size} delay={-0.55} />
        <Gull x={76 * size} y={9 * size} scale={size * 0.85} delay={-0.15} />
      </div>
    </div>
  );
}

export default function SkyLife() {
  return (
    <div aria-hidden className="bh-motion pointer-events-none absolute inset-0 overflow-hidden">
      <Flock top="30%" duration={42} delay={4} opacity={0.55} size={1} />
      <Flock top="22%" duration={70} delay={-30} opacity={0.3} size={0.6} />
      <span className="meteor" style={{ top: '9%', left: '28%', animationDelay: '7s' }} />
      <span className="meteor" style={{ top: '5%', left: '64%', animationDelay: '19s', animationDuration: '27s' }} />
    </div>
  );
}
