import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl" />

      <div className="max-w-2xl text-center relative z-10">
        {/* Large 404 */}
        <h1 className="text-9xl md:text-[12rem] font-bold text-slate-900 mb-4 leading-none">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Seite nicht gefunden
        </h2>

        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            <Home className="h-5 w-5" />
            Zur Startseite
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white hover:-translate-y-0.5 transition-all"
          >
            Kontakt
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Vielleicht finden Sie es hier:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-slate-600 hover:text-slate-900 transition-colors">
              Lösungen
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/partners" className="text-slate-600 hover:text-slate-900 transition-colors">
              Partner
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/cases" className="text-slate-600 hover:text-slate-900 transition-colors">
              Referenzen
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
              Über uns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
