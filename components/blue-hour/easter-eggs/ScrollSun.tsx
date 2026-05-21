'use client';

import { useEasterEggs } from './EasterEggsProvider';

/**
 * A small warm sun-disc that's fixed to the viewport but moves vertically
 * in tandem with scroll progress (0% scroll → top of screen, 100% → bottom).
 * Reinforces the sky → ground journey: the sun "sets" as you go down.
 */
export default function ScrollSun() {
  const { scrollY, duskMode } = useEasterEggs();

  // Sun's vertical position: 8% at top of page, 88% at bottom
  const top = 8 + scrollY * 80;

  // Color shifts as it sets
  const colour =
    scrollY < 0.4 ? '#ffecc8' :        // high warm
    scrollY < 0.75 ? '#ffb877' :       // setting amber
    '#c66060';                          // sunset crimson

  // In daylight mode, render brighter; in midnight, dimmer
  const opacity = duskMode === 'midnight' ? 0.35 : duskMode === 'daylight' ? 0.95 : 0.75;

  return (
    <div
      aria-hidden
      className="fixed pointer-events-none z-[1]"
      style={{
        right: '6%',
        top: `${top}%`,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colour} 0%, ${colour}aa 40%, transparent 70%)`,
        boxShadow: `0 0 40px ${colour}80, 0 0 80px ${colour}40`,
        opacity,
        transition: 'top 0.15s ease-out, background 0.6s, box-shadow 0.6s',
        mixBlendMode: 'screen',
      }}
    />
  );
}
