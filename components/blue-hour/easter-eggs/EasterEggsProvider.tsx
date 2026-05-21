'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type DuskMode = 'blue-hour' | 'daylight' | 'midnight';

interface EasterEggCtx {
  duskMode: DuskMode;
  setDuskMode: (m: DuskMode) => void;
  cycleDusk: () => void;
  blueprint: boolean;
  setBlueprint: (b: boolean) => void;
  cursor: { x: number; y: number };
  scrollY: number;
}

const Ctx = createContext<EasterEggCtx | null>(null);

const KONAMI: string[] = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const DUSK_GRADIENTS: Record<DuskMode, string> = {
  'blue-hour': 'linear-gradient(180deg, #162a47 0%, #1f3a5f 14%, #2f578c 30%, #4a7bb5 48%, #7da8d1 66%, #a4c1de 84%, #c6d8e8 100%)',
  'daylight':  'linear-gradient(180deg, #6aa6d6 0%, #92c1e2 35%, #cfe1ef 65%, #c6d8e8 100%)',
  'midnight':  'linear-gradient(180deg, #050c1a 0%, #0b1d35 25%, #1f3a5f 55%, #3b6699 85%, #c6d8e8 100%)',
};

export function EasterEggsProvider({ children }: { children: ReactNode }) {
  const [duskMode, setDuskMode] = useState<DuskMode>('blue-hour');
  const [blueprint, setBlueprint] = useState(false);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);

  const cycleDusk = useCallback(() => {
    setDuskMode((m) => (m === 'blue-hour' ? 'daylight' : m === 'daylight' ? 'midnight' : 'blue-hour'));
  }, []);

  // Apply gradient swap to .grad-blue-hour elements via CSS var
  useEffect(() => {
    document.documentElement.style.setProperty('--top-grad-current', DUSK_GRADIENTS[duskMode]);
  }, [duskMode]);

  // Apply blueprint mode (toggles .blueprint-mode on <html>)
  useEffect(() => {
    document.documentElement.classList.toggle('blueprint-mode', blueprint);
  }, [blueprint]);

  // Cursor tracking (normalised 0..1)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll tracking (normalised 0..1 of total scrollable height)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Konami code listener
  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(k);
      if (buffer.length > KONAMI.length) buffer = buffer.slice(-KONAMI.length);
      if (buffer.length === KONAMI.length && buffer.every((b, i) => b === KONAMI[i])) {
        cycleDusk();
        buffer = [];
        // Visual feedback
        document.documentElement.classList.add('konami-flash');
        setTimeout(() => document.documentElement.classList.remove('konami-flash'), 600);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cycleDusk]);

  // Blueprint trigger — type "HYDE"
  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === 'hyde') {
        setBlueprint((b) => !b);
        buffer = '';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Ctx.Provider value={{ duskMode, setDuskMode, cycleDusk, blueprint, setBlueprint, cursor, scrollY }}>
      {children}
    </Ctx.Provider>
  );
}

export function useEasterEggs() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useEasterEggs must be inside EasterEggsProvider');
  return ctx;
}
