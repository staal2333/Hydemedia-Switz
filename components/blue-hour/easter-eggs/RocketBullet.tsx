'use client';

import { useState } from 'react';

/**
 * The little glow bullet next to "HYDE MEDIA" — but it launches when clicked.
 * Replaces the static span in BlueHourNav.
 */
export default function RocketBullet() {
  const [launching, setLaunching] = useState(false);

  const launch = () => {
    if (launching) return;
    setLaunching(true);
    setTimeout(() => setLaunching(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        launch();
      }}
      aria-label="Rakete abfeuern"
      className="relative inline-flex items-center justify-center"
      style={{
        height: 10,
        width: 10,
        minHeight: 0,
        minWidth: 0,
        padding: 0,
        background: 'transparent',
      }}
    >
      <span
        className="absolute inset-0 rounded-full bg-glow"
        style={{
          boxShadow: '0 0 14px var(--glow)',
          transition: 'transform 0.6s cubic-bezier(0.6, 0, 0.4, 1), opacity 0.3s',
          transform: launching ? 'translateY(-200vh) scale(0.5)' : 'translateY(0) scale(1)',
          opacity: launching ? 0 : 1,
        }}
      />
      {/* Rocket trail */}
      {launching && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2"
          style={{
            width: 2,
            height: 0,
            background: 'linear-gradient(to top, transparent, rgba(255,236,200,0.95), transparent)',
            animation: 'rocket-trail 1.2s ease-out forwards',
            transformOrigin: 'top',
          }}
        />
      )}
    </button>
  );
}
