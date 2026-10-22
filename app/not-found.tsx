import Link from 'next/link';
import { TowedBanner } from '@/components/blue-hour/OutdoorMarquee';

const STARS = [
  [8, 12, 1.5], [17, 26, 1], [24, 9, 2], [36, 18, 1], [47, 7, 1.5], [58, 22, 1],
  [66, 11, 2], [74, 27, 1], [83, 8, 1.5], [91, 19, 1], [12, 38, 1], [79, 40, 1],
] as const;

/**
 * 404: lost in the city at blue hour. The banner plane flies past with the
 * news, and the way home is right below.
 */
export default function NotFound() {
  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 text-white"
      style={{ background: 'linear-gradient(180deg, #162a47 0%, #1f3a5f 18%, #2f578c 40%, #4a7bb5 62%, #7da8d1 82%, #a4c1de 100%)' }}
    >
      {/* Stars and moon */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map(([x, y, s], i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: s * 2,
              height: s * 2,
              background: '#ffecc8',
              boxShadow: `0 0 ${s * 4}px #ffecc8`,
              animation: `star-twinkle ${4 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
        <span
          className="absolute rounded-full"
          style={{ top: '9%', left: '7%', width: 32, height: 32, boxShadow: 'inset -7px 3px 0 0 #ffecc8', transform: 'rotate(-18deg)', filter: 'drop-shadow(0 0 10px rgba(255,236,200,0.55))' }}
        />
      </div>

      {/* The plane brings the news */}
      <div aria-hidden className="plane-lane pointer-events-none absolute inset-x-0 top-[18%] h-[90px] overflow-hidden">
        <div className="plane-cross absolute left-0 top-6" style={{ animation: 'plane-cross 26s linear infinite' }}>
          <div style={{ animation: 'plane-bob 7s ease-in-out infinite' }}>
            <TowedBanner text="404 · SEITE NICHT GEFUNDEN" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl text-center mt-24">
        <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/70 inline-block mb-6">§ 404</span>
        <h1
          className="font-display font-normal text-white m-0 mb-5"
          style={{ fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.98, letterSpacing: '-0.03em', textShadow: '0 2px 24px rgba(14,30,51,0.25)' }}
        >
          Verlaufen <span className="italic text-cream whitespace-nowrap">in der Stadt.</span>
        </h1>
        <p className="font-body text-white/90 m-0 mb-2" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
          Diese Seite gibt es nicht, oder sie ist umgezogen.
        </p>
        <p className="font-body text-white/65 text-[14px] m-0 mb-10">This page does not exist or has moved.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/de"
            className="inline-flex justify-center items-center gap-3 px-7 py-4 rounded-full bg-cream text-dusk font-ui font-semibold text-[12px] uppercase tracking-[0.1em] hover:bg-glow transition-colors"
          >
            Zur Startseite →
          </Link>
          <Link
            href="/de/standorte"
            className="inline-flex justify-center items-center gap-3 px-7 py-4 rounded-full border border-white/40 text-white font-ui font-semibold text-[12px] uppercase tracking-[0.1em] hover:bg-white/10 transition-colors"
          >
            Standorte ansehen
          </Link>
        </div>

        <nav aria-label="Abkürzungen" className="mt-12 flex flex-wrap justify-center gap-x-5 gap-y-2 font-ui text-[13px] text-white/80">
          <Link href="/de/scaffolding" className="hover:text-white">Gerüstwerbung</Link>
          <Link href="/de/facade" className="hover:text-white">Fassadenwerbung</Link>
          <Link href="/de/blog" className="hover:text-white">Wissen</Link>
          <Link href="/de/contact" className="hover:text-white">Kontakt</Link>
          <Link href="/en" className="hover:text-white">English</Link>
        </nav>
      </div>
    </div>
  );
}
