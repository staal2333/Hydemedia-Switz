'use client';

/**
 * Hyde Media wordmark — geometric block letters built from rectangles.
 * Static SVG (no framer-motion) so it doesn't trigger the Next 14.2
 * client-manifest bug. Inherits color via `currentColor`.
 */
export default function HydeLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 285" className={className} aria-label="Hyde Media" role="img">
      {/* H */}
      <rect x="0" y="0" width="32" height="200" fill="currentColor" />
      <rect x="0" y="84" width="120" height="32" fill="currentColor" />
      <rect x="88" y="0" width="32" height="200" fill="currentColor" />

      {/* Y */}
      <rect x="180" y="0" width="32" height="100" fill="currentColor" />
      <rect x="278" y="0" width="32" height="100" fill="currentColor" />
      <rect x="180" y="84" width="130" height="32" fill="currentColor" />
      <rect x="229" y="100" width="32" height="100" fill="currentColor" />

      {/* D */}
      <rect x="370" y="0" width="32" height="200" fill="currentColor" />
      <path
        d="M 402 0 L 490 0 Q 550 0 550 100 Q 550 200 490 200 L 402 200 L 402 168 L 490 168 Q 518 168 518 100 Q 518 32 490 32 L 402 32 Z"
        fill="currentColor"
      />

      {/* E */}
      <rect x="590" y="0" width="32" height="200" fill="currentColor" />
      <rect x="590" y="0" width="140" height="32" fill="currentColor" />
      <rect x="590" y="84" width="120" height="32" fill="currentColor" />
      <rect x="590" y="168" width="140" height="32" fill="currentColor" />

      {/* MEDIA — thin bars, sized to span H–D */}
      {/* M */}
      <rect x="0" y="225" width="14" height="50" fill="currentColor" />
      <rect x="0" y="225" width="50" height="14" fill="currentColor" />
      <rect x="18" y="239" width="14" height="36" fill="currentColor" />
      <rect x="36" y="225" width="14" height="50" fill="currentColor" />
      {/* E */}
      <rect x="70" y="225" width="14" height="50" fill="currentColor" />
      <rect x="70" y="225" width="48" height="14" fill="currentColor" />
      <rect x="70" y="243" width="43" height="14" fill="currentColor" />
      <rect x="70" y="261" width="48" height="14" fill="currentColor" />
      {/* D */}
      <rect x="138" y="225" width="14" height="50" fill="currentColor" />
      <path
        d="M 152 225 L 182 225 Q 205 225 205 250 Q 205 275 182 275 L 152 275 L 152 263 L 182 263 Q 193 263 193 250 Q 193 237 182 237 L 152 237 Z"
        fill="currentColor"
      />
      {/* I */}
      <rect x="225" y="225" width="14" height="50" fill="currentColor" />
      {/* A */}
      <rect x="259" y="225" width="14" height="50" fill="currentColor" />
      <rect x="259" y="225" width="50" height="14" fill="currentColor" />
      <rect x="259" y="243" width="50" height="14" fill="currentColor" />
      <rect x="295" y="225" width="14" height="50" fill="currentColor" />
    </svg>
  );
}
