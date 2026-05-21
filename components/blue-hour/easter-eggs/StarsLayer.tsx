'use client';

import { useState, useMemo, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const STARS: Star[] = [
  { id: 1, x: 8,  y: 12, size: 1.5, color: '#ffecc8', delay: 0 },
  { id: 2, x: 14, y: 22, size: 1.0, color: '#ffffff', delay: 0.5 },
  { id: 3, x: 22, y: 8,  size: 2.0, color: '#ffecc8', delay: 1.0 },
  { id: 4, x: 31, y: 18, size: 1.0, color: '#ffffff', delay: 1.5 },
  { id: 5, x: 39, y: 6,  size: 1.5, color: '#ffffff', delay: 2.0 },
  { id: 6, x: 47, y: 24, size: 1.0, color: '#ffecc8', delay: 2.5 },
  { id: 7, x: 55, y: 14, size: 2.0, color: '#ffffff', delay: 0.3 },
  { id: 8, x: 63, y: 9,  size: 1.0, color: '#ffecc8', delay: 0.8 },
  { id: 9, x: 71, y: 21, size: 1.5, color: '#ffffff', delay: 1.3 },
  { id: 10, x: 79, y: 7,  size: 1.0, color: '#ffecc8', delay: 1.8 },
  { id: 11, x: 86, y: 16, size: 2.0, color: '#ffffff', delay: 2.3 },
  { id: 12, x: 93, y: 11, size: 1.0, color: '#ffecc8', delay: 0.7 },
  { id: 13, x: 4,  y: 28, size: 1.5, color: '#ffffff', delay: 1.2 },
  { id: 14, x: 27, y: 32, size: 1.0, color: '#ffffff', delay: 1.7 },
  { id: 15, x: 68, y: 30, size: 1.0, color: '#ffecc8', delay: 2.2 },
];

interface FallingStar { id: number; x: number; y: number }
interface ConstellationPoint { id: number; x: number; y: number }

/**
 * Stars are clickable. Each click spawns a "shooting star" that streaks down
 * and disappears. Click 3 stars in a row and a constellation forms,
 * connecting them with thin glowing lines. Click anywhere else to clear.
 */
export default function StarsLayer() {
  const [falling, setFalling] = useState<FallingStar[]>([]);
  const [picked, setPicked] = useState<ConstellationPoint[]>([]);

  const onStarClick = useCallback((s: Star, e: React.MouseEvent) => {
    e.stopPropagation();
    // Falling star streak
    const fid = Date.now() + s.id;
    setFalling((arr) => [...arr, { id: fid, x: s.x, y: s.y }]);
    setTimeout(() => setFalling((arr) => arr.filter((f) => f.id !== fid)), 1400);

    // Track constellation picks
    setPicked((arr) => {
      const next = [...arr, { id: s.id, x: s.x, y: s.y }];
      if (next.length > 3) {
        // Reset on 4th
        return [{ id: s.id, x: s.x, y: s.y }];
      }
      return next;
    });
  }, []);

  const polylineD = useMemo(() => {
    if (picked.length < 2) return null;
    return picked.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [picked]);

  return (
    <div aria-hidden className="absolute inset-x-0 top-0 h-[35%] pointer-events-none">
      {/* Star dots — pointer-events-auto so they're clickable */}
      {STARS.map((s) => (
        <button
          key={s.id}
          onClick={(e) => onStarClick(s, e)}
          aria-label="Auf Stern klicken"
          className="absolute rounded-full pointer-events-auto cursor-pointer hover:scale-150 transition-transform"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size * 2,
            height: s.size * 2,
            background: s.color,
            boxShadow: `0 0 ${s.size * 4}px ${s.color}`,
            animation: `star-twinkle ${4 + s.delay}s ease-in-out ${s.delay}s infinite`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Falling star streaks */}
      {falling.map((f) => (
        <span
          key={f.id}
          className="absolute pointer-events-none"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: 2,
            height: 60,
            background: 'linear-gradient(to bottom, rgba(255,236,200,0.95), transparent)',
            animation: 'star-fall 1.4s ease-out forwards',
            transform: 'translate(-50%, 0) rotate(15deg)',
            transformOrigin: 'top',
          }}
        />
      ))}

      {/* Constellation lines (3 picked stars) */}
      {polylineD && picked.length >= 2 && (
        <svg
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d={polylineD}
            fill="none"
            stroke="#ffecc8"
            strokeWidth="0.15"
            strokeOpacity="0.7"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(255,236,200,0.8))',
              animation: 'constellation-fade 4s ease-in-out forwards',
            }}
          />
        </svg>
      )}
    </div>
  );
}
