'use client';

import { useEffect, useState } from 'react';

interface LightProps { side: 'left' | 'right'; top: string; }

function Streetlight({ side, top }: LightProps) {
  const [visible, setVisible] = useState(false);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    let lampEl: HTMLDivElement | null = null;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            // Slight delay before turning on for "warming up" effect
            setTimeout(() => setLit(true), 120);
          }
        }
      },
      { threshold: 0.2 }
    );
    // We attach the observer on next frame after mount via the ref pattern
    requestAnimationFrame(() => {
      if (lampEl) obs.observe(lampEl);
    });

    const id = `streetlight-${side}-${top}`;
    lampEl = document.getElementById(id) as HTMLDivElement | null;
    if (lampEl) obs.observe(lampEl);
    return () => obs.disconnect();
  }, [side, top]);

  return (
    <div
      id={`streetlight-${side}-${top}`}
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        [side]: '4%',
        top,
        height: 220,
        width: 60,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s',
      }}
    >
      {/* Pole */}
      <div
        className="absolute"
        style={{
          [side === 'left' ? 'right' : 'left']: 8,
          top: 30,
          width: 2,
          height: 190,
          background: 'rgba(20,20,20,0.7)',
        }}
      />
      {/* Arm */}
      <div
        className="absolute"
        style={{
          [side === 'left' ? 'right' : 'left']: 8,
          top: 30,
          width: 22,
          height: 2,
          background: 'rgba(20,20,20,0.7)',
        }}
      />
      {/* Lamp head */}
      <div
        className="absolute rounded-full"
        style={{
          [side === 'left' ? 'right' : 'left']: 28,
          top: 24,
          width: 14,
          height: 14,
          background: lit ? '#ffecc8' : 'rgba(20,20,20,0.5)',
          boxShadow: lit ? '0 0 20px rgba(255,236,200,0.95), 0 0 40px rgba(255,236,200,0.55), 0 0 80px rgba(255,236,200,0.3)' : 'none',
          transition: 'background 1.2s, box-shadow 1.2s',
        }}
      />
      {/* Light cone */}
      {lit && (
        <div
          className="absolute"
          style={{
            [side === 'left' ? 'right' : 'left']: -10,
            top: 32,
            width: 90,
            height: 200,
            background: `radial-gradient(ellipse 80% 100% at ${side === 'left' ? '90%' : '10%'} 0%, rgba(255,236,200,0.18), transparent 75%)`,
            transformOrigin: 'top center',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}

/**
 * Two pairs of streetlights along the descending gradient — they switch on
 * once they enter the viewport. Sits inside the GroundFlow wrapper.
 */
export default function Streetlights() {
  return (
    <>
      <Streetlight side="left" top="65%" />
      <Streetlight side="right" top="72%" />
      <Streetlight side="left" top="84%" />
      <Streetlight side="right" top="92%" />
    </>
  );
}
