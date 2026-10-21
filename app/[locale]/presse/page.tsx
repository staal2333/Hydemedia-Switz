import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getRegionConfig } from '@/lib/region';
import casesData from '@/public/data/cases.json';
import { PLACEMENT_KINDS, getCurrentPlacements, localizeCase, type CaseStudy } from '@/lib/placements';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const COPY = {
  de: {
    eyebrow: 'Presse',
    h1: 'Presse und Medien',
    lede: 'Fakten, Logo, Bilder und ein kurzer Text über Hyde Media. Verwenden Sie das Material frei für die Berichterstattung über uns, und melden Sie sich, wenn etwas fehlt.',
    title: 'Presse: Fakten, Logo und Bilder von Hyde Media',
    description: 'Pressematerial zu Hyde Media Schweiz: Fakten zum Unternehmen, Logo, Kampagnenbilder und Pressekontakt. Zur freien redaktionellen Verwendung.',
    aboutH: 'Über Hyde Media',
    about: (n: number) =>
      `Hyde Media verkauft Aussenwerbung im Grossformat in der Schweiz: Gerüstwerbung und Fassadenwerbung, mit Sitz in Basel. Das Unternehmen übernimmt den ganzen Ablauf von der Standortwahl und der Bewilligung bis zu Druck, Montage und Demontage. Aktuell hat Hyde Media ${n} Standorte im Portfolio.`,
    factsH: 'Fakten',
    facts: (n: number) => [
      ['Name', 'Hyde Media'],
      ['Adresse', ADDRESS],
      ['Formate', 'Gerüstwerbung, Fassadenwerbung'],
      ['Stadt', 'Basel'],
      ['Standorte im Portfolio', String(n)],
    ],
    logoH: 'Logo',
    logoText: 'Verwenden Sie das Logo auf hellem Hintergrund und behalten Sie die Proportionen bei.',
    download: 'Logo herunterladen (PNG)',
    photosH: 'Bilder aus Kampagnen',
    photosText: 'Bilder aus Kampagnen, die wir umgesetzt haben. Bitte mit «Foto: Hyde Media» kennzeichnen. Klicken für volle Grösse.',
    contactH: 'Pressekontakt',
    contactText: 'Fragen, Interviews und Bilder in hoher Auflösung:',
    nameUse: 'Bitte schreiben Sie «Hyde Media».',
  },
  en: {
    eyebrow: 'Press',
    h1: 'Press and media',
    lede: 'Facts, logo, images and a short text about Hyde Media. Use them freely when writing about us, and get in touch if anything is missing.',
    title: 'Press: Facts, Logo and Images from Hyde Media',
    description: 'Press materials about Hyde Media Switzerland: company facts, logo, campaign images and press contact. Free to use for editorial coverage.',
    aboutH: 'About Hyde Media',
    about: (n: number) =>
      `Hyde Media sells large-format outdoor advertising in Switzerland: scaffolding and facade advertising, based in Basel. The company handles the whole process from choosing the site and the permit to print, installation and removal. Hyde Media currently has ${n} sites in its portfolio.`,
    factsH: 'Facts',
    facts: (n: number) => [
      ['Name', 'Hyde Media'],
      ['Address', `${ADDRESS}, Switzerland`],
      ['Formats', 'Scaffolding advertising, facade advertising'],
      ['City', 'Basel'],
      ['Sites in portfolio', String(n)],
    ],
    logoH: 'Logo',
    logoText: 'Use the logo on a light background and keep its proportions.',
    download: 'Download logo (PNG)',
    photosH: 'Campaign images',
    photosText: 'Images from campaigns we have run. Credit "Photo: Hyde Media". Click for full size.',
    contactH: 'Press contact',
    contactText: 'Questions, interviews and high-resolution images:',
    nameUse: 'Please write "Hyde Media".',
  },
};

const CONTACT = getRegionConfig('de');
const ADDRESS = CONTACT.address;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  return generateSEOMetadata({ title: c.title, description: c.description, path: '/presse', locale });
}

export default function PressPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const lang = locale === 'en' ? 'en' : 'de';
  const c = COPY[lang];
  const active = PLACEMENT_KINDS.flatMap((k) => getCurrentPlacements(k)).length;
  // Only campaigns photographed in Switzerland belong in a Swiss press kit.
  const cases = (casesData as unknown as CaseStudy[])
    .filter((cs) => /basel/i.test(cs.location))
    .map((cs) => localizeCase(cs, locale));
  const h2 = 'font-display font-normal text-ink m-0 mb-4';

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {c.eyebrow}</span>
            <h1 className="font-display font-normal text-white m-0 mb-6" style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {c.h1}
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {c.lede}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-16">
          <div className="shell grid lg:grid-cols-[1.3fr_1fr] grid-cols-1 gap-6 items-start">
            <div className="bg-white border border-rule rounded-[24px] p-7 md:p-10">
              <h2 className={h2} style={{ fontSize: 30, letterSpacing: '-0.025em' }}>{c.aboutH}</h2>
              <p className="text-[16px] leading-[1.75] text-ink-soft m-0 mb-6">{c.about(active)}</p>
              <h2 className={h2} style={{ fontSize: 24, letterSpacing: '-0.02em' }}>{c.factsH}</h2>
              <dl className="m-0 border-t border-rule">
                {c.facts(active).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 py-3 border-b border-rule">
                    <dt className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted pt-1">{k}</dt>
                    <dd className="m-0 text-[15px] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-[13px] text-muted mt-4 mb-0">{c.nameUse}</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white border border-rule rounded-[24px] p-7">
                <h2 className={h2} style={{ fontSize: 24, letterSpacing: '-0.02em' }}>{c.logoH}</h2>
                <div className="relative h-28 bg-fog rounded-xl mb-4">
                  <Image src="/logo.png" alt="Hyde Media logo" fill sizes="400px" className="object-contain p-5" />
                </div>
                <p className="text-[14px] text-ink-soft m-0 mb-4">{c.logoText}</p>
                <a href="/logo.png" download="hyde-media-logo.png" className="inline-flex px-5 py-3 rounded-full bg-ink text-white font-ui font-semibold text-[11px] uppercase tracking-[0.1em] hover:bg-dusk">
                  {c.download} ↓
                </a>
              </div>
              <div className="bg-ink text-white rounded-[24px] p-7">
                <h2 className="font-display font-normal text-white m-0 mb-3" style={{ fontSize: 24 }}>{c.contactH}</h2>
                <p className="text-white/75 text-[14px] m-0 mb-4">{c.contactText}</p>
                <a href={`mailto:${CONTACT.email}`} className="block font-display text-[20px] text-glow hover:underline break-all">{CONTACT.email}</a>
                <a href="tel:+41772338121" className="block font-display text-[20px] text-white mt-1 hover:underline">{CONTACT.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-28">
          <div className="shell">
            <h2 className={h2} style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.025em' }}>{c.photosH}</h2>
            <p className="text-[15px] text-ink-soft m-0 mb-8 max-w-2xl">{c.photosText}</p>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
              {cases.map((cs) => (
                <figure key={cs.slug} className="m-0 bg-white border border-rule rounded-[18px] overflow-hidden">
                  <a href={cs.images[0]} target="_blank" rel="noopener" className="block relative aspect-[4/3] bg-fog">
                    <Image src={cs.images[0]} alt={`${cs.brand}: ${cs.format}, ${cs.location}`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </a>
                  <figcaption className="p-4 flex justify-between items-baseline gap-3">
                    <span className="font-display text-ink text-[18px]">{cs.brand}</span>
                    <Link href={`/${lang}/cases/${cs.slug}`} className="font-ui font-semibold text-[10.5px] uppercase tracking-[0.14em] text-ink-soft hover:text-mid shrink-0">
                      Case →
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
