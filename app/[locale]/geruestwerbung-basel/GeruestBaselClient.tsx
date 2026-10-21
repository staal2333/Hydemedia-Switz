'use client';

import { useLocale } from 'next-intl';
import LocationTemplate, { LocationConfig } from '@/components/blue-hour/LocationTemplate';
import { CITY_RE, dailyReach, livePlacements, nameList, sizeRange } from '@/lib/city-facts';

// Every fact about the portfolio comes from placements.json, so the page
// follows the live sites instead of naming ones that have come down.
const live = livePlacements('basel', 'scaffolding');
const sizes = sizeRange(live);
const reach = dailyReach(live);

const shared = {
  slug: 'geruestwerbung-basel',
  city: 'Basel',
  serviceKind: 'scaffolding' as const,
  neighborhoods: ['Messe Basel', 'Kleinbasel', 'Riehenring', 'Badischer Bahnhof', 'Innenstadt'],
  placementFilter: (location: string) => CITY_RE.basel.test(location),
  caseFilter: (location: string) => CITY_RE.basel.test(location),
};

function configFor(locale: string): LocationConfig {
  if (locale === 'en') {
    const names = nameList(live, 'and');
    return {
      ...shared,
      serviceName: 'Scaffolding advertising',
      heroTitle: 'Scaffolding advertising in Basel',
      heroAccent: 'at the junctions by Messe Basel.',
      heroDescription: names
        ? `Large-format scaffolding banners at ${names}, on the busy routes around Messe Basel. We handle the permit, print, installation and removal.`
        : 'Large-format scaffolding banners on busy routes in Basel. We handle the permit, print, installation and removal.',
      stats: [
        { value: reach ?? '—', label: 'Contacts per day at our busiest site' },
        { value: sizes ?? '—', label: 'Banner sizes' },
        { value: '24 h', label: 'Reply on weekdays' },
        { value: '4 wks', label: 'Min. booking' },
      ],
      localContext:
        'Scaffolding advertising in Basel works where traffic slows down and gathers: at traffic lights, tram stops and the approach roads to Messe Basel and the Congress Center. ' +
        (names ? `Our sites are ${names}, on Riehenring between the motorway and Kleinbasel. ` : '') +
        'Scaffolding only stands while a building is being renovated, so each site is available for a limited period. That is why we list every current site with its size, traffic figures and period, so you can compare them directly.',
      whyCity: [
        { title: 'Trade fair traffic', desc: 'Messe Basel and the Congress Center bring visitors from all over Switzerland and abroad, right past our sites.' },
        { title: 'Waiting time', desc: 'Traffic lights and tram stops give drivers, passengers and pedestrians time to actually read the banner.' },
        { title: 'Large formats', desc: sizes ? `Scaffolding banners of ${sizes} where advertising normally cannot hang.` : 'Large banners where advertising normally cannot hang.' },
        { title: 'All-inclusive', desc: 'Permit, print, installation and removal are included in the offer.' },
      ],
      faq: [
        { q: 'Where in Basel can you put up scaffolding advertising?', a: names ? `Currently at ${names}. New sites appear when renovations start, and we list them here as soon as they can be booked.` : 'New sites appear when renovations start. Contact us and we will tell you what is coming up.' },
        { q: 'What does scaffolding advertising in Basel cost?', a: 'The price depends on the site, size and period, and the offer includes print, installation and the permit. You receive a concrete offer within 24 hours on weekdays.' },
        { q: 'How long can a banner stay up?', a: 'As long as the scaffolding stands, typically from a few weeks to several months. The minimum booking is 4 weeks, and each site shows its available period.' },
        { q: 'Do you handle the permit in Basel?', a: 'Yes. We apply for the permit and take care of the formalities. Permits can exclude certain content; at Riehenring 141, for example, alcohol, political and pornographic advertising is not allowed.' },
        { q: 'Can you help with the design?', a: 'We advise on large-format design and legibility at a distance and check that the print files are in order before the banner goes into production.' },
      ],
    };
  }
  const names = nameList(live, 'und');
  return {
    ...shared,
    serviceName: 'Gerüstwerbung',
    heroTitle: 'Gerüstwerbung in Basel',
    heroAccent: 'an den Kreuzungen bei der Messe.',
    heroDescription: names
      ? `Gerüstbanner im Grossformat am ${names}, auf den verkehrsreichen Routen rund um die Messe Basel. Wir übernehmen Bewilligung, Druck, Montage und Demontage.`
      : 'Gerüstbanner im Grossformat auf verkehrsreichen Routen in Basel. Wir übernehmen Bewilligung, Druck, Montage und Demontage.',
    stats: [
      { value: reach ?? '—', label: 'Kontakte pro Tag am stärksten Standort' },
      { value: sizes ?? '—', label: 'Bannergrössen' },
      { value: '24 h', label: 'Antwort an Werktagen' },
      { value: '4 Wo.', label: 'Mindestbuchung' },
    ],
    localContext:
      'Gerüstwerbung in Basel wirkt dort, wo sich der Verkehr verlangsamt und bündelt: an Ampeln, Tramhaltestellen und den Zufahrten zur Messe Basel und zum Congress Center. ' +
      (names ? `Unsere Standorte sind ${names}, am Riehenring zwischen Autobahn und Kleinbasel. ` : '') +
      'Ein Gerüst steht nur, solange ein Gebäude saniert wird, deshalb ist jeder Standort nur für einen bestimmten Zeitraum verfügbar. Darum zeigen wir alle aktuellen Standorte mit Grösse, Verkehrszahlen und Zeitraum, damit Sie sie direkt vergleichen können.',
    whyCity: [
      { title: 'Messeverkehr', desc: 'Messe Basel und das Congress Center bringen Besucherinnen und Besucher aus der ganzen Schweiz und dem Ausland direkt an unseren Standorten vorbei.' },
      { title: 'Wartezeit', desc: 'Ampeln und Tramhaltestellen geben Autofahrenden, Passagieren und Fussgängern Zeit, das Banner wirklich zu lesen.' },
      { title: 'Grosse Formate', desc: sizes ? `Gerüstbanner mit ${sizes} an Orten, an denen sonst keine Werbung hängen kann.` : 'Grosse Banner an Orten, an denen sonst keine Werbung hängen kann.' },
      { title: 'Alles inklusive', desc: 'Bewilligung, Druck, Montage und Demontage sind im Angebot enthalten.' },
    ],
    faq: [
      { q: 'Wo in Basel kann man Gerüstwerbung platzieren?', a: names ? `Aktuell am ${names}. Neue Standorte entstehen, wenn Sanierungen beginnen, und wir zeigen sie hier, sobald sie buchbar sind.` : 'Neue Standorte entstehen, wenn Sanierungen beginnen. Kontaktieren Sie uns, wir sagen Ihnen, was in Planung ist.' },
      { q: 'Was kostet Gerüstwerbung in Basel?', a: 'Der Preis hängt von Standort, Grösse und Zeitraum ab, und das Angebot enthält Druck, Montage und Bewilligung. Sie erhalten an Werktagen innerhalb von 24 Stunden ein konkretes Angebot.' },
      { q: 'Wie lange kann ein Banner hängen?', a: 'So lange das Gerüst steht, typischerweise einige Wochen bis mehrere Monate. Die Mindestbuchung beträgt 4 Wochen, und bei jedem Standort steht der verfügbare Zeitraum.' },
      { q: 'Kümmern Sie sich um die Bewilligung in Basel?', a: 'Ja. Wir beantragen die Bewilligung und erledigen die Formalitäten. Bewilligungen können Inhalte ausschliessen; am Riehenring 141 ist zum Beispiel Werbung für Alkohol, Politik und pornografische Inhalte nicht erlaubt.' },
      { q: 'Helfen Sie bei der Gestaltung?', a: 'Wir beraten zu Grossformat-Design und Lesbarkeit auf Distanz und prüfen, ob die Druckdaten in Ordnung sind, bevor das Banner in Produktion geht.' },
    ],
  };
}

export default function GeruestBaselClient() {
  const locale = useLocale();
  return <LocationTemplate config={configFor(locale)} />;
}
