'use client';

import { useLocale } from 'next-intl';
import LocationTemplate, { LocationConfig } from '@/components/blue-hour/LocationTemplate';
import { CITY_RE, dailyReach, livePlacements, nameList, sizeRange } from '@/lib/city-facts';

// "Megaposter" and "Werbeblache" are what Swiss buyers search for; the product
// is the same scaffolding banner as /geruestwerbung-basel, so this page is
// built around the terms and how the format compares with posters.
const live = livePlacements('basel', 'scaffolding');
const sizes = sizeRange(live);
const reach = dailyReach(live);

const shared = {
  slug: 'megaposter',
  city: 'Basel',
  serviceKind: 'scaffolding' as const,
  neighborhoods: ['Megaposter', 'Werbeblache', 'Gerüstbanner', 'Mesh', 'Riehenring', 'Messe Basel'],
  placementFilter: (location: string) => CITY_RE.basel.test(location),
  caseFilter: (location: string) => CITY_RE.basel.test(location),
};

function configFor(locale: string): LocationConfig {
  if (locale === 'en') {
    const names = nameList(live, 'and');
    return {
      ...shared,
      neighborhoods: ['Megaposter', 'Advertising tarp', 'Scaffolding banner', 'Mesh', 'Riehenring', 'Messe Basel'],
      serviceName: 'Megaposter',
      heroTitle: 'Megaposters in Basel',
      heroAccent: 'as banners on scaffolding.',
      heroDescription: names
        ? `A megaposter is a large-format advertising tarp on scaffolding or a facade. Ours measure ${sizes} at ${names}, with permit, print, installation and removal included.`
        : 'A megaposter is a large-format advertising tarp on scaffolding or a facade. We handle permit, print, installation and removal.',
      stats: [
        { value: reach ?? '—', label: 'Contacts per day at our busiest site' },
        { value: sizes ?? '—', label: 'Megaposter sizes' },
        { value: '4 wks', label: 'Min. booking' },
        { value: '24 h', label: 'Reply on weekdays' },
      ],
      localContext:
        'In Switzerland, "megaposter" is the usual name for advertising that covers a large part of a building: a printed tarp (Blache) on scaffolding or on a facade. ' +
        (names ? `In Basel we offer megaposters at ${names}, on Riehenring by Messe Basel. ` : '') +
        'Because scaffolding only stands during a renovation, each site is available for a set period. We list every current site with its size, traffic and period.',
      whyCity: [
        { title: 'Dominant size', desc: sizes ? `${sizes} is many times a classic poster site, and the motif stands alone instead of in a row of posters.` : 'Many times the size of a classic poster site, with no neighbouring posters competing.' },
        { title: 'Long dwell time', desc: 'Traffic lights and tram stops give people time to read the megaposter properly.' },
        { title: 'Visible from afar', desc: 'At this size the message is readable from a long distance and from several directions.' },
        { title: 'Everything included', desc: 'Permit, print on mesh, installation and removal are part of the offer.' },
      ],
      guide: {
        eyebrow: 'Terms',
        title: 'Megaposter, tarp, scaffolding banner:',
        accent: 'what is what?',
        paragraphs: [
          'The terms describe the same thing from different angles. "Megaposter" names the format: advertising far larger than a poster. "Werbeblache" (advertising tarp) names the material: a printed sheet of PVC or mesh. "Scaffolding banner" names where it hangs. In the [glossary](/en/glossar) you will find these and other terms explained briefly.',
          'On scaffolding, megaposters are usually printed on mesh, a fabric with small holes that lets the wind through. Colours look slightly lighter on mesh, which is worth keeping in mind for the design. Our guide to [print data and design](/en/blog/geruestbanner-druckdaten-spezifikationen-gestaltung) explains resolution, bleed and legibility at a distance.',
          'A megaposter needs an advertising permit (Reklamebewilligung). We submit the application and handle the formalities; read more in our article on [permits for scaffolding advertising](/en/blog/bewilligungen-geruestwerbung-schweiz). The minimum booking is 4 weeks, and prices are on request because they depend on site, size and period.',
        ],
        table: {
          caption: 'Swiss poster formats compared with a megaposter at Hyde Media. Poster sizes are the standard dimensions of the formats.',
          head: ['Format', 'Size', 'Area'],
          rows: [
            ['F4 (world format)', '89.5 × 128 cm', '≈ 1.1 m²'],
            ['F12', '268.5 × 128 cm', '≈ 3.4 m²'],
            ['F24', '268.5 × 256 cm', '≈ 6.9 m²'],
            ['Megaposter on scaffolding (Hyde Media)', 'Depends on the scaffolding', sizes ?? 'on request'],
          ],
        },
      },
      faq: [
        { q: 'What is a megaposter?', a: 'A megaposter is a very large advertising banner on scaffolding or a facade, usually printed on a tarp or mesh. It covers a large part of the building and is many times the size of a classic poster.' },
        { q: 'How big is a megaposter?', a: sizes ? `It depends on the scaffolding. Our current megaposters in Basel measure ${sizes}.` : 'It depends on the scaffolding or facade. Ask us for the sizes of current sites.' },
        { q: 'What does a megaposter cost?', a: 'Prices are on request because they depend on site, size and period. The offer includes the permit, print, installation and removal, and you receive it within 24 hours on weekdays.' },
        { q: 'How long does a megaposter hang?', a: 'The minimum booking is 4 weeks. On scaffolding, the maximum is limited by how long the renovation lasts; each site shows its available period.' },
        { q: 'Do I need a permit for a megaposter?', a: 'Yes, an advertising permit is needed. We submit the application. Permits can exclude certain content; at Riehenring 141 alcohol, political and pornographic advertising are not allowed.' },
      ],
    };
  }
  const names = nameList(live, 'und');
  return {
    ...shared,
    serviceName: 'Megaposter',
    heroTitle: 'Megaposter in Basel',
    heroAccent: 'als Werbeblache am Gerüst.',
    heroDescription: names
      ? `Ein Megaposter ist eine Werbeblache im Grossformat an Gerüst oder Fassade. Unsere messen ${sizes} am ${names} – Bewilligung, Druck, Montage und Demontage inklusive.`
      : 'Ein Megaposter ist eine Werbeblache im Grossformat an Gerüst oder Fassade. Wir übernehmen Bewilligung, Druck, Montage und Demontage.',
    stats: [
      { value: reach ?? '—', label: 'Kontakte pro Tag am stärksten Standort' },
      { value: sizes ?? '—', label: 'Megaposter-Grössen' },
      { value: '4 Wo.', label: 'Mindestbuchung' },
      { value: '24 h', label: 'Antwort an Werktagen' },
    ],
    localContext:
      'Megaposter nennt man in der Schweiz Werbung, die einen grossen Teil eines Gebäudes bedeckt: eine bedruckte Blache an einem Baugerüst oder an einer Fassade. ' +
      (names ? `In Basel bieten wir Megaposter am ${names} an, am Riehenring bei der Messe Basel. ` : '') +
      'Weil ein Gerüst nur während einer Sanierung steht, ist jeder Standort für einen bestimmten Zeitraum verfügbar. Wir zeigen alle aktuellen Standorte mit Grösse, Verkehrszahlen und Zeitraum.',
    whyCity: [
      { title: 'Dominante Grösse', desc: sizes ? `${sizes} sind ein Vielfaches einer klassischen Plakatstelle, und das Sujet steht allein statt in einer Reihe von Plakaten.` : 'Ein Vielfaches einer klassischen Plakatstelle, ohne Nachbarplakate, die ablenken.' },
      { title: 'Lange Kontaktzeit', desc: 'Ampeln und Tramhaltestellen geben den Menschen Zeit, das Megaposter wirklich zu lesen.' },
      { title: 'Fernwirkung', desc: 'In dieser Grösse ist die Botschaft auf grosse Distanz und aus mehreren Richtungen lesbar.' },
      { title: 'Alles inklusive', desc: 'Bewilligung, Druck auf Mesh, Montage und Demontage sind im Angebot enthalten.' },
    ],
    guide: {
      eyebrow: 'Begriffe',
      title: 'Megaposter, Werbeblache, Gerüstbanner:',
      accent: 'Was ist was?',
      paragraphs: [
        'Die Begriffe beschreiben dasselbe aus verschiedenen Blickwinkeln. «Megaposter» bezeichnet das Format: Werbung, die weit grösser ist als ein Plakat. «Werbeblache» bezeichnet das Material: eine bedruckte Plane aus PVC oder Mesh. «Gerüstbanner» oder «Gerüstwerbung» bezeichnet den Ort, an dem sie hängt. Im [Glossar](/de/glossar) finden Sie diese und weitere Begriffe kurz erklärt.',
        'Am Baugerüst werden Megaposter meist auf Mesh gedruckt, ein Gewebe mit kleinen Öffnungen, durch das der Wind hindurchgeht. Farben wirken auf Mesh etwas heller, was man bei der Gestaltung berücksichtigen sollte. Unser Ratgeber zu [Druckdaten und Gestaltung](/de/blog/geruestbanner-druckdaten-spezifikationen-gestaltung) erklärt Auflösung, Beschnitt und Lesbarkeit auf Distanz.',
        'Für ein Megaposter braucht es eine Reklamebewilligung. Wir reichen das Gesuch ein und erledigen die Formalitäten; mehr dazu im Artikel über [Bewilligungen für Gerüstwerbung](/de/blog/bewilligungen-geruestwerbung-schweiz). Die Mindestbuchung beträgt 4 Wochen, Preise erhalten Sie auf Anfrage, weil sie von Standort, Grösse und Zeitraum abhängen.',
      ],
      table: {
        caption: 'Schweizer Plakatformate im Vergleich mit einem Megaposter bei Hyde Media. Plakatgrössen sind die Standardmasse der Formate.',
        head: ['Format', 'Masse', 'Fläche'],
        rows: [
          ['F4 (Weltformat)', '89,5 × 128 cm', '≈ 1,1 m²'],
          ['F12', '268,5 × 128 cm', '≈ 3,4 m²'],
          ['F24', '268,5 × 256 cm', '≈ 6,9 m²'],
          ['Megaposter am Gerüst (Hyde Media)', 'Je nach Gerüst', sizes ?? 'auf Anfrage'],
        ],
      },
    },
    faq: [
      { q: 'Was ist ein Megaposter?', a: 'Ein Megaposter ist ein sehr grosses Werbebanner an einem Gerüst oder einer Fassade, meist auf eine Blache oder Mesh gedruckt. Es bedeckt einen grossen Teil des Gebäudes und ist ein Vielfaches einer klassischen Plakatstelle.' },
      { q: 'Wie gross ist ein Megaposter?', a: sizes ? `Das hängt vom Gerüst ab. Unsere aktuellen Megaposter in Basel messen ${sizes}.` : 'Das hängt vom Gerüst oder der Fassade ab. Fragen Sie uns nach den Grössen der aktuellen Standorte.' },
      { q: 'Was kostet ein Megaposter?', a: 'Preise gibt es auf Anfrage, weil sie von Standort, Grösse und Zeitraum abhängen. Die Offerte enthält Bewilligung, Druck, Montage und Demontage, und Sie erhalten sie an Werktagen innert 24 Stunden.' },
      { q: 'Wie lange hängt ein Megaposter?', a: 'Die Mindestbuchung beträgt 4 Wochen. Am Gerüst begrenzt die Dauer der Sanierung die maximale Laufzeit; bei jedem Standort steht der verfügbare Zeitraum.' },
      { q: 'Braucht ein Megaposter eine Bewilligung?', a: 'Ja, es braucht eine Reklamebewilligung. Wir reichen das Gesuch ein. Bewilligungen können Inhalte ausschliessen; am Riehenring 141 ist Werbung für Alkohol, Politik und pornografische Inhalte nicht erlaubt.' },
    ],
  };
}

export default function MegaposterClient() {
  const locale = useLocale();
  return <LocationTemplate config={configFor(locale)} />;
}
