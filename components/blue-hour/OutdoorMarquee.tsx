'use client';

/**
 * PlaneBanner — single small plane drags a HYDEMEDIA banner across the sky,
 * sitting at the top of GroundFlow as the bridge between dusk and ground.
 * Riffs on the classic outdoor-advertising plane-with-banner trope.
 *
 * Pure SVG/CSS, no images, no JS at runtime.
 */

function PlaneWithBanner() {
  return (
    <div className="flex items-center">
      {/* Top-down plane silhouette pointing right — clearly readable as an airplane */}
      <svg
        width="58"
        height="30"
        viewBox="0 0 64 32"
        className="shrink-0"
        style={{ filter: 'drop-shadow(0 2px 3px rgba(20,30,42,0.20))' }}
      >
        {/* Body + wings (one combined shape) */}
        <path
          fill="#1f3a5f"
          d="M 26 4 L 38 4 L 38 14 L 58 15 L 60 16 L 58 17 L 38 18 L 38 28 L 26 28 L 26 18 L 6 17 L 4 16 L 6 15 L 26 14 Z"
        />
        {/* Tail fin (vertical) */}
        <path
          fill="#1f3a5f"
          d="M 8 8 L 14 8 L 14 14 L 6 15 Z"
          opacity="0.85"
        />
        {/* Tail fin bottom */}
        <path
          fill="#1f3a5f"
          d="M 8 24 L 14 24 L 14 18 L 6 17 Z"
          opacity="0.85"
        />
        {/* Cockpit window */}
        <ellipse cx="46" cy="16" rx="4" ry="1.5" fill="#fff" opacity="0.35" />
      </svg>

      {/* Tow line */}
      <div className="h-px w-3 bg-dusk/45 shrink-0" />

      {/* Banner with fluttering animation */}
      <div
        className="ml-0.5 px-4 py-1.5 bg-dusk text-cream font-display italic font-bold whitespace-nowrap rounded-sm shrink-0"
        style={{
          fontSize: 14,
          letterSpacing: '0.06em',
          boxShadow: '0 2px 6px rgba(14,30,51,0.22)',
          animation: 'banner-flutter 1.4s ease-in-out infinite',
          transformOrigin: 'left center',
        }}
      >
        HYDEMEDIA
      </div>
    </div>
  );
}

export default function PlaneBanner() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden"
      style={{ height: 100 }}
    >
      <div
        className="absolute will-change-transform"
        style={{
          top: '34%',
          left: 0,
          animation: 'plane-fly 32s linear infinite',
        }}
      >
        <PlaneWithBanner />
      </div>
    </section>
  );
}
