'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';

export type DuskMode = 'blue-hour' | 'daylight' | 'midnight' | 'golden';
export type City = 'basel' | 'zuerich';

/**
 * Every secret in the blue-hour city. Finding one shows a small note with the
 * count; finding all of them unlocks golden hour in the sky.
 */
export const EGGS = ['moon', 'plane', 'balloon', 'hygge', 'stars', 'konami', 'blueprint', 'bike', 'banner', 'crane', 'zuerich', 'feuerwerk'] as const;
export type EggId = (typeof EGGS)[number];

const EGG_NAMES: Record<EggId, { de: string; en: string }> = {
  moon: { de: 'Der Mond', en: 'The moon' },
  plane: { de: 'Der Pilot winkt', en: 'The pilot waves' },
  balloon: { de: 'Der Ballon aus Dänemark', en: 'The Danish balloon' },
  hygge: { de: 'Hej fra Danmark', en: 'Hej fra Danmark' },
  stars: { de: 'Ein Sternbild', en: 'A constellation' },
  konami: { de: 'Der Konami-Code', en: 'The Konami code' },
  blueprint: { de: 'Die Baupläne', en: 'The blueprints' },
  bike: { de: 'Kling-kling', en: 'Ring ring' },
  banner: { de: 'Ihre Marke auf der Skyline', en: 'Your brand on the skyline' },
  crane: { de: 'Der Kranführer', en: 'The crane operator' },
  zuerich: { de: 'Willkommen in Zürich', en: 'Welcome to Zurich' },
  feuerwerk: { de: 'Feuerwerk über dem Rhein', en: 'Fireworks over the Rhine' },
};

const STORE_KEY = 'hyde-eggs';

interface EasterEggCtx {
  duskMode: DuskMode;
  setDuskMode: (m: DuskMode) => void;
  cycleDusk: () => void;
  blueprint: boolean;
  setBlueprint: (b: boolean) => void;
  cursor: { x: number; y: number };
  scrollY: number;
  /** Set when someone types hygge/danmark/hej; 0 until then. */
  danishAt: number;
  /** Set when someone types feuerwerk/bundesfeier; 0 until then. */
  fireworksAt: number;
  /** Which skyline is showing: type "zürich" or "basel" to switch. */
  city: City;
  found: EggId[];
  markFound: (id: EggId) => void;
}

const Ctx = createContext<EasterEggCtx | null>(null);

const KONAMI: string[] = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export const DUSK_GRADIENTS: Record<DuskMode, string> = {
  'blue-hour': 'linear-gradient(180deg, #162a47 0%, #1f3a5f 14%, #2f578c 30%, #4a7bb5 48%, #7da8d1 66%, #a4c1de 84%, #c6d8e8 100%)',
  'daylight':  'linear-gradient(180deg, #6aa6d6 0%, #92c1e2 35%, #cfe1ef 65%, #c6d8e8 100%)',
  'midnight':  'linear-gradient(180deg, #050c1a 0%, #0b1d35 25%, #1f3a5f 55%, #3b6699 85%, #c6d8e8 100%)',
  // Unlocked by finding every secret.
  'golden':    'linear-gradient(180deg, #2a2950 0%, #4f4378 16%, #9a5f86 34%, #e2876f 54%, #f7b37e 72%, #fbd9a8 88%, #c6d8e8 100%)',
};

function readFound(): EggId[] {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    return EGGS.filter((e) => list.includes(e));
  } catch {
    return [];
  }
}

export function EasterEggsProvider({ children }: { children: ReactNode }) {
  const [duskMode, setDuskMode] = useState<DuskMode>('blue-hour');
  const [blueprint, setBlueprint] = useState(false);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const [danishAt, setDanishAt] = useState(0);
  const [fireworksAt, setFireworksAt] = useState(0);
  const [city, setCity] = useState<City>('basel');
  const [found, setFound] = useState<EggId[]>([]);
  const [toast, setToast] = useState<{ id: number; title: string; line: string } | null>(null);
  const foundRef = useRef<EggId[]>([]);

  const golden = found.length === EGGS.length;

  // Restore progress after mount (storage is per browser and may be blocked).
  useEffect(() => {
    const f = readFound();
    foundRef.current = f;
    setFound(f);
  }, []);

  const markFound = useCallback((id: EggId) => {
    if (foundRef.current.includes(id)) return;
    const next = [...foundRef.current, id];
    foundRef.current = next;
    setFound(next);
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* private mode */ }
    const en = document.documentElement.lang === 'en';
    const all = next.length === EGGS.length;
    setToast({
      id: Date.now(),
      title: all
        ? (en ? 'You found every secret' : 'Sie haben alle Geheimnisse gefunden')
        : `${EGG_NAMES[id][en ? 'en' : 'de']}`,
      line: all
        ? (en ? 'Golden hour is yours. Click the moon.' : 'Die goldene Stunde gehört Ihnen. Klicken Sie auf den Mond.')
        : (en ? `Secret found · ${next.length} of ${EGGS.length}` : `Geheimnis gefunden · ${next.length} von ${EGGS.length}`),
    });
    if (all) setDuskMode('golden');
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const cycleDusk = useCallback(() => {
    setDuskMode((m) => {
      const order: DuskMode[] = foundRef.current.length === EGGS.length
        ? ['blue-hour', 'daylight', 'midnight', 'golden']
        : ['blue-hour', 'daylight', 'midnight'];
      const i = order.indexOf(m);
      return order[(i + 1) % order.length];
    });
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

  // A note for whoever opens the console: the list of things to find.
  useEffect(() => {
    const w = window as unknown as { __hydeHello?: boolean };
    if (w.__hydeHello) return;
    w.__hydeHello = true;
    const en = document.documentElement.lang === 'en';
    console.log(
      '%cHYDE MEDIA%c\n' +
        (en
          ? `You found the back of the skyline. There are ${EGGS.length} secrets in the city. Some hints: type HYDE, HYGGE, FEUERWERK or ZÜRICH · the Konami code ↑↑↓↓←→←→BA · hover the moon (the real phase tonight) and click it · click the plane · catch the balloon · ring the cargo bike · click three stars · find the crane.`
          : `Sie haben die Rückseite der Skyline gefunden. In der Stadt gibt es ${EGGS.length} Geheimnisse. Ein paar Tipps: Tippen Sie HYDE, HYGGE, FEUERWERK oder ZÜRICH · der Konami-Code ↑↑↓↓←→←→BA · fahren Sie über den Mond (die echte Phase heute Abend) und klicken Sie darauf · klicken Sie auf das Flugzeug · fangen Sie den Ballon · klingeln Sie am Cargovelo · klicken Sie drei Sterne an · finden Sie den Kran.`),
      'font: italic 700 28px sans-serif; color: #4a7bb5; letter-spacing: 2px;',
      'font: 13px sans-serif; color: #3a547a;',
    );
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
        markFound('konami');
        buffer = [];
        // Visual feedback
        document.documentElement.classList.add('konami-flash');
        setTimeout(() => document.documentElement.classList.remove('konami-flash'), 600);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cycleDusk, markFound]);

  // Typed words: HYDE (blueprints), HYGGE/DANMARK/HEJ (a balloon and snow),
  // FEUERWERK/BUNDESFEIER (fireworks), ZÜRICH / BASEL (switch the skyline).
  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-14);
      if (buffer.endsWith('hyde')) {
        setBlueprint((b) => !b);
        markFound('blueprint');
        buffer = '';
      } else if (/(hygge|danmark|hej)$/.test(buffer)) {
        setDanishAt(Date.now());
        markFound('hygge');
        buffer = '';
      } else if (/(feuerwerk|bundesfeier)$/.test(buffer)) {
        setFireworksAt(Date.now());
        markFound('feuerwerk');
        buffer = '';
      } else if (/(zürich|zuerich|zurich)$/.test(buffer)) {
        setCity('zuerich');
        markFound('zuerich');
        buffer = '';
      } else if (buffer.endsWith('basel')) {
        setCity('basel');
        buffer = '';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [markFound]);

  return (
    <Ctx.Provider value={{ duskMode, setDuskMode, cycleDusk, blueprint, setBlueprint, cursor, scrollY, danishAt, fireworksAt, city, found, markFound }}>
      {children}
      {/* Found-a-secret note. Polite live region, so screen readers hear it too. */}
      <div aria-live="polite" className="pointer-events-none fixed left-4 bottom-4 z-[60]">
        {toast && (
          <div
            key={toast.id}
            className="egg-toast rounded-2xl border px-4 py-3 shadow-[0_18px_40px_-16px_rgba(14,30,51,0.45)] backdrop-blur-xl"
            style={{ background: golden ? 'rgba(74,45,70,0.82)' : 'rgba(31,58,95,0.82)', borderColor: 'rgba(255,255,255,0.22)' }}
          >
            <div className="font-ui font-semibold text-[10px] tracking-[0.2em] uppercase text-glow mb-0.5">✦ {toast.line}</div>
            <div className="font-display italic text-[17px] text-white">{toast.title}</div>
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

export function useEasterEggs() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useEasterEggs must be inside EasterEggsProvider');
  return ctx;
}

/** For pieces that may also render outside the homepage provider. */
export function useEggsOptional(): Pick<EasterEggCtx, 'markFound' | 'city'> {
  const ctx = useContext(Ctx);
  return ctx ?? { markFound: () => {}, city: 'basel' };
}
