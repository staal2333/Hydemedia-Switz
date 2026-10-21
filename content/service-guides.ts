import { getCurrentPlacements, placementPath, type PlacementKind } from '@/lib/placements';

/**
 * Explanatory copy and FAQs for the service pages. The pages were mostly a
 * list of placements, which gave search engines and AI assistants little
 * text to understand or quote. Facts here match the rest of the site and the
 * placement data: Hyde Media handles print, installation, removal and the
 * permit application; the minimum booking is 4 weeks; prices are on request.
 * Switzerland sells scaffolding and facades only — no digital screens.
 */

export type GuideLocale = 'de' | 'en';
export interface Faq { q: string; a: string }
export interface ServiceGuide { heading: string; paragraphs: string[]; faqHeading: string; faqs: Faq[] }

export type GuideKind = 'scaffolding' | 'facade' | 'overview';

type SellableKind = Exclude<PlacementKind, 'digital'>;

/** "125–175 m²" from the live placements, so the copy follows the portfolio. */
function sizeRange(kind: SellableKind): string | null {
  const sizes = getCurrentPlacements(kind).map((p) => p.dimensions.width).filter((w) => w > 0);
  if (sizes.length === 0) return null;
  const min = Math.min(...sizes);
  const max = Math.max(...sizes);
  return min === max ? `${min} m²` : `${min}–${max} m²`;
}

/** Cities with a current placement, e.g. "Basel" or "Basel und Zürich". */
function cityList(kinds: SellableKind[], l: GuideLocale): string | null {
  const cities = [
    ...new Set(
      kinds
        .flatMap((k) => getCurrentPlacements(k))
        .map((p) => p.location.split(',').pop()?.trim() ?? '')
        .filter(Boolean),
    ),
  ];
  return cities.length ? joinList(cities, l) : null;
}

function joinList(items: string[], l: GuideLocale): string {
  if (items.length <= 1) return items.join('');
  const and = l === 'de' ? ' und ' : ' and ';
  return items.slice(0, -1).join(', ') + and + items[items.length - 1];
}

/** Linked list of the current placements of a kind: "[Riehenring 141](/de/standorte/riehenring-141) und …". The city is named by the surrounding copy. */
function placementLinks(kind: SellableKind, l: GuideLocale): string | null {
  const items = getCurrentPlacements(kind).map((p) => `[${p.name}](/${l}${placementPath(p)})`);
  return items.length ? joinList(items, l) : null;
}

/** Blog posts share one slug in both languages. */
const BLOG = {
  scaffoldingVsFacade: { de: 'geruest-vs-fassade-richtige-wahl', en: 'geruest-vs-fassade-richtige-wahl' },
  measuring: { de: 'ooh-kampagnenerfolg-messen', en: 'ooh-kampagnenerfolg-messen' },
} as const;

const EMAIL = 'theodor.staal@hydemedia.ch';
const PHONE = '+41 77 233 81 21';

/** The pillar for "Aussenwerbung": what the formats are and how to choose. */
function overviewGuide(l: GuideLocale): ServiceGuide {
  const scaffolding = sizeRange('scaffolding');
  const facade = sizeRange('facade');
  const cities = cityList(['scaffolding', 'facade'], l);
  const p = (de: string, en: string) => (l === 'de' ? de : en);
  const link = (path: string) => '/' + l + path;
  return {
    heading: p(
      'Aussenwerbung in der Schweiz: so wählen Sie das richtige Format',
      'Outdoor advertising in Switzerland: how to choose a format',
    ),
    paragraphs: [
      p(
        'Aussenwerbung, auch Out-of-Home (OOH) genannt, ist Werbung im öffentlichen Raum: Werbebanner an Gerüsten und Fassaden, Plakate, Werbung an Haltestellen und im Verkehr. Hyde Media vermarktet in der Schweiz zwei Grossformate, Gerüstwerbung und Fassadenwerbung' +
          (cities ? ', mit aktuellen Standorten in ' + cities : '') +
          '. Die beiden Formate erfüllen unterschiedliche Aufgaben.',
        'Outdoor advertising, also called out-of-home (OOH), is advertising in public space: banners on scaffolding and facades, posters, and advertising at stops and on transport. In Switzerland Hyde Media sells two large formats, scaffolding advertising and facade advertising' +
          (cities ? ', with current sites in ' + cities : '') +
          '. Each format does a different job.',
      ),
      p(
        '[Gerüstwerbung](' + link('/scaffolding') + ') bietet die grössten Flächen' + (scaffolding ? ', aktuell ' + scaffolding : '') + ', für eine Periode, die der Bauzeit folgt. Sie ist das Format für Lancierungen und Kampagnen, die einige Wochen lang das Stadtbild prägen sollen.',
        '[Scaffolding advertising](' + link('/scaffolding') + ') gives the largest spaces' + (scaffolding ? ', currently ' + scaffolding : '') + ', for a period that follows the building works. It is the format for launches and campaigns that need to dominate the street for a few weeks.',
      ),
      p(
        '[Fassadenwerbung](' + link('/facade') + ') hängt an Fassaden und Brandmauern, ist nicht an eine Baustelle gebunden und baut Bekanntheit durch Wiederholung auf' + (facade ? '. Die Flächen messen ' + facade : '') + '.',
        '[Facade advertising](' + link('/facade') + ') hangs on facades and blank end walls, is not tied to building works and builds awareness through repetition' + (facade ? '. The spaces measure ' + facade : '') + '.',
      ),
      p(
        'Bei beiden Formaten übernimmt Hyde Media alles: Druck, Montage, Demontage und das Bewilligungsgesuch. Die Mindestbuchung beträgt 4 Wochen, Preise erhalten Sie auf Anfrage. Alle aktuellen Flächen finden Sie unter [Standorte](' + link('/standorte') + ').',
        'For both formats Hyde Media handles everything: print, installation, removal and the permit application. The minimum booking is 4 weeks, and prices are on request. All current sites are listed under [locations](' + link('/standorte') + ').',
      ),
    ],
    faqHeading: p('Fragen zur Aussenwerbung', 'Questions about outdoor advertising'),
    faqs: [
      {
        q: p('Was sind Aussenwerbemedien?', 'What are out-of-home media?'),
        a: p(
          'Aussenwerbemedien sind alle Flächen im öffentlichen Raum, die Werbung tragen können: Gerüste, Fassaden und Brandmauern, Plakatstellen, Haltestellen und Verkehrsmittel. Hyde Media vermarktet in der Schweiz die grossen Formate: Gerüstwerbung und Fassadenwerbung.',
          'Out-of-home media are all the surfaces in public space that can carry an ad: scaffolding, facades and blank end walls, poster sites, stops and transport. In Switzerland Hyde Media sells the large formats: scaffolding advertising and facade advertising.',
        ),
      },
      {
        q: p('Was ist Aussenwerbung?', 'What is outdoor advertising?'),
        a: p(
          'Aussenwerbung, oder Out-of-Home (OOH), ist Werbung, die Menschen ausserhalb ihres Zuhauses erreicht: an Gerüsten, Fassaden und Plakatstellen in der Stadt. Sie lässt sich nicht überspringen oder blockieren, und Grossformate an stark befahrenen Lagen werden täglich von vielen Menschen gesehen.',
          'Outdoor advertising, or out-of-home (OOH), is advertising that reaches people outside the home: on scaffolding, facades and poster sites in the city. It cannot be skipped or blocked, and large formats at busy locations are seen by many people every day.',
        ),
      },
      {
        q: p('Welches Format soll ich wählen?', 'Which format should I choose?'),
        a: p(
          'Wählen Sie Gerüstwerbung für einen kurzen, grossen Auftritt und Fassadenwerbung für eine längerfristige Präsenz. Mehr dazu in [Gerüstbanner oder Fassade](' + link('/blog/' + BLOG.scaffoldingVsFacade.de) + ').',
          'Choose scaffolding for a short, big impact and a facade for a longer-term presence. Read more in [scaffolding or facade](' + link('/blog/' + BLOG.scaffoldingVsFacade.en) + ').',
        ),
      },
      {
        q: p('Was kostet Aussenwerbung?', 'How much does outdoor advertising cost?'),
        a: p(
          'Preise erhalten Sie auf Anfrage. Sie hängen von Standort, Grösse, Periode und Produktion ab. Sie erhalten ein Angebot, das Druck, Montage, Demontage und das Bewilligungsgesuch umfasst. Schreiben Sie an ' + EMAIL + ', rufen Sie an unter ' + PHONE + ' oder nutzen Sie das [Kontaktformular](' + link('/contact') + ').',
          'Prices are on request. They depend on site, size, period and production. You get one quote covering print, installation, removal and the permit application. Email ' + EMAIL + ', call ' + PHONE + ' or use the [contact form](' + link('/contact') + ').',
        ),
      },
      {
        q: p('Braucht Aussenwerbung eine Bewilligung?', 'Does outdoor advertising need a permit?'),
        a: p(
          'Für Werbung im öffentlichen Raum braucht es in der Regel eine Bewilligung der Stadt bzw. des Kantons. Was genau gilt, hängt von der Gemeinde ab. Hyde Media klärt das für Sie ab und reicht das Gesuch ein. Bewilligungen können Auflagen enthalten: Am Riehenring 141 ist zum Beispiel Werbung für Alkohol, Politik und pornografische Inhalte ausgeschlossen. Mehr in den [FAQ](' + link('/faq') + ').',
          'Advertising in public space generally needs a permit from the city or canton. What applies depends on the municipality. Hyde Media clarifies this for you and submits the application. Permits can come with conditions: at Riehenring 141, for example, alcohol, political and pornographic advertising is excluded. More in the [FAQ](' + link('/faq') + ').',
        ),
      },
      {
        q: p('Wie schnell kann eine Kampagne starten?', 'How quickly can a campaign go live?'),
        a: p(
          'Das hängt vor allem vom freien Zeitraum am Standort und von der Bewilligung ab, die vor dem Aushang vorliegen muss. Melden Sie sich deshalb früh. Die Mindestbuchung beträgt 4 Wochen.',
          'It depends mainly on when the site is free and on the permit, which must be in place before the banner goes up, so get in touch early. The minimum booking is 4 weeks.',
        ),
      },
      {
        q: p('Wie misst man die Wirkung?', 'How do you measure the effect?'),
        a: p(
          'Mit den Kontaktzahlen des Standorts, Bekanntheitsmessungen vor und nach der Kampagne und der Entwicklung von Suchanfragen und Website-Besuchen während der Laufzeit. Siehe [So messen Sie den Erfolg Ihrer OOH-Kampagne](' + link('/blog/' + BLOG.measuring.de) + ').',
          'With the site’s contact figures, awareness surveys before and after, and the change in searches and website visits during the campaign. See [how to measure an OOH campaign](' + link('/blog/' + BLOG.measuring.en) + ').',
        ),
      },
      {
        q: p('Kann ich mit meiner Fassade Geld verdienen?', 'Can I earn money from my facade?'),
        a: p(
          'Ja. Hyde Media mietet Fassaden- und Gerüstflächen von Liegenschaftseigentümern und kümmert sich um Werbekunden, Montage und das Bewilligungsgesuch. Mehr [für Liegenschaftseigentümer](' + link('/property-owners') + ').',
          'Yes. Hyde Media rents facade and scaffolding space from property owners and handles advertisers, installation and the permit application. Read more [for property owners](' + link('/property-owners') + ').',
        ),
      },
    ],
  };
}

function scaffoldingGuide(l: GuideLocale): ServiceGuide {
  const range = sizeRange('scaffolding');
  const cities = cityList(['scaffolding'], l);
  const where = placementLinks('scaffolding', l);
  const link = (path: string) => '/' + l + path;

  if (l === 'de') {
    return {
      heading: 'Gerüstwerbung: so funktioniert es',
      paragraphs: [
        'Gerüstwerbung ist ein grossformatiges Werbebanner am Gerüst rund um ein Gebäude, das renoviert wird. Die Fläche gibt es nur, solange das Gerüst steht, deshalb wird sie für Perioden verkauft, die der Bauzeit folgen. Dafür erhalten Sie eine der grössten Werbeflächen der Stadt, an Lagen, an denen sonst keine Aussenwerbung möglich ist.',
        'Hyde Media übernimmt den ganzen Ablauf: Wir stellen die Fläche zur Verfügung, reichen das Bewilligungsgesuch bei Stadt bzw. Kanton ein, drucken das Banner und montieren und demontieren es. Sie liefern die Gestaltung, um den Rest kümmern wir uns.',
        'So läuft es ab: Sie wählen einen Standort unter unseren [Standorten](' + link('/standorte') + ') und erhalten ein Angebot. Nach der Buchung reichen wir das Bewilligungsgesuch ein und stimmen Format und Abgabetermin der Druckdaten mit Ihnen ab. Wir drucken, montieren und nehmen das Banner nach Ende der Periode wieder ab. Die Mindestbuchung beträgt 4 Wochen.',
        'Gerüstwerbung heisst auch Gerüstbanner, Baugerüstwerbung, Gerüstplane oder Werbung am Baugerüst. Gemeint ist immer dasselbe: ein Werbebanner im Grossformat, das am Gerüst hängt, während das Gebäude renoviert wird.',
        ...(range
          ? [`Unsere aktuellen Gerüstflächen${cities ? ' in ' + cities : ''} messen ${range}. Jeder Standort oben zeigt Grösse, Kontakte pro Tag und Periode, damit Sie direkt vergleichen können.`]
          : []),
      ],
      faqHeading: 'Fragen zur Gerüstwerbung',
      faqs: [
        {
          q: 'Was ist Gerüstwerbung?',
          a: 'Gerüstwerbung ist ein grossformatiges Werbebanner am Gerüst rund um ein Gebäude in Renovation. Es ist eines der grössten Formate der Aussenwerbung' + (range ? `, bei unseren aktuellen Standorten ${range}` : '') + ', und hängt so lange, wie das Gerüst steht.',
        },
        {
          q: 'Was kostet Gerüstwerbung?',
          a: 'Preise erhalten Sie auf Anfrage. Sie hängen von Standort, Grösse, Periode und Produktion ab. Das Angebot umfasst Druck, Montage, Demontage und das Bewilligungsgesuch. Anfragen an ' + EMAIL + ' oder ' + PHONE + '.',
        },
        {
          q: 'Braucht Gerüstwerbung eine Bewilligung?',
          a: 'Ja. Die Stadt bzw. der Kanton erteilt die Bewilligung für die Werbung am Gerüst, und wir reichen das Gesuch für Sie ein. Bewilligungen können Auflagen enthalten: Am Riehenring 141 in Basel ist Werbung für Alkohol, Politik und pornografische Inhalte ausgeschlossen. Mehr in den [FAQ](' + link('/faq') + ').',
        },
        {
          q: 'Wie lange kann ein Gerüstbanner hängen?',
          a: 'So lange das Gerüst steht. Die verfügbare Periode ist bei jedem Standort angegeben, oft in Kalenderwochen (KW). Die Mindestbuchung beträgt 4 Wochen.',
        },
        {
          q: 'Wie früh muss ich buchen?',
          a: 'So früh wie möglich. Die Periode richtet sich nach der Bauzeit, und die Bewilligung muss vor dem Aushang vorliegen. Fragen Sie den gewünschten Standort deshalb frühzeitig an.',
        },
        {
          q: 'Wer kümmert sich um Druck und Montage?',
          a: 'Wir. Das Banner wird im Grossformat gedruckt, und wir montieren und demontieren es. Beides ist im Angebot enthalten.',
        },
        {
          q: 'Wo bieten Sie Gerüstwerbung an?',
          a: where
            ? 'Aktuell in ' + (cities ?? 'Basel') + ': ' + where + '. Alle Flächen finden Sie unter [Standorte](' + link('/standorte') + ').'
            : 'Die aktuellen Flächen finden Sie unter [Standorte](' + link('/standorte') + '). Planen Sie eine Kampagne an einem bestimmten Ort, [kontaktieren Sie uns](' + link('/contact') + ').',
        },
      ],
    };
  }

  return {
    heading: 'Scaffolding advertising: how it works',
    paragraphs: [
      'Scaffolding advertising is a large-format banner on the scaffolding around a building under renovation. The space only exists while the scaffolding stands, so it is sold in periods that follow the building works. In return you get one of the largest advertising spaces in the city, in places where outdoor advertising normally cannot go.',
      'Hyde Media handles the whole process: we provide the site, apply to the city or canton for the permit, print the banner, and install and remove it. You supply the creative and we take care of the rest.',
      'How it works: you choose a site from our [locations](' + link('/standorte') + ') and receive a quote. Once booked, we submit the permit application and agree the artwork format and delivery date with you. We print, install, and take the banner down again when the period ends. The minimum booking is 4 weeks.',
      ...(range
        ? [`Our current scaffolding sites${cities ? ' in ' + cities : ''} measure ${range}. Each site above shows its size, daily contacts and period, so you can compare them directly.`]
        : []),
    ],
    faqHeading: 'Questions about scaffolding advertising',
    faqs: [
      {
        q: 'What is scaffolding advertising?',
        a: 'Scaffolding advertising is a large-format banner on the scaffolding around a building under renovation. It is one of the largest outdoor advertising formats' + (range ? `, ${range} at our current sites` : '') + ', and it stays up for as long as the scaffolding stands.',
      },
      {
        q: 'How much does scaffolding advertising cost?',
        a: 'Prices are on request. They depend on site, size, period and production. The quote covers print, installation, removal and the permit application. Contact ' + EMAIL + ' or ' + PHONE + '.',
      },
      {
        q: 'Does scaffolding advertising need a permit?',
        a: 'Yes. The city or canton grants the permit for advertising on the scaffolding, and we submit the application for you. Permits can come with conditions: at Riehenring 141 in Basel, alcohol, political and pornographic advertising is excluded. More in the [FAQ](' + link('/faq') + ').',
      },
      {
        q: 'How long can a scaffolding banner stay up?',
        a: 'For as long as the scaffolding stands. The available period is shown for each site, often in calendar weeks (CW). The minimum booking is 4 weeks.',
      },
      {
        q: 'How far ahead should I book?',
        a: 'As early as possible. The period follows the building works, and the permit must be in place before the banner goes up, so enquire about your preferred site early.',
      },
      {
        q: 'Who handles printing and installation?',
        a: 'We do. The banner is printed in large format, and we install and remove it. Both are included in the quote.',
      },
      {
        q: 'Where do you offer scaffolding advertising?',
        a: where
          ? 'Currently in ' + (cities ?? 'Basel') + ': ' + where + '. All sites are listed under [locations](' + link('/standorte') + ').'
          : 'Current sites are listed under [locations](' + link('/standorte') + '). If you are planning a campaign in a particular place, [get in touch](' + link('/contact') + ').',
      },
    ],
  };
}

function facadeGuide(l: GuideLocale): ServiceGuide {
  const range = sizeRange('facade');
  const cities = cityList(['facade'], l);
  const where = placementLinks('facade', l);
  const link = (path: string) => '/' + l + path;

  if (l === 'de') {
    return {
      heading: 'Fassadenwerbung: langfristige Sichtbarkeit an Gebäuden',
      paragraphs: [
        'Fassadenwerbung ist ein Werbebanner an der Fassade oder Brandmauer eines Gebäudes. Die Fläche ist nicht an eine Baustelle gebunden und kann deshalb über längere Zeit gebucht werden, um Bekanntheit durch Wiederholung aufzubauen. Das macht die Fassade zum ruhigen Format der Aussenwerbung: dieselbe Botschaft, am selben Ort, Tag für Tag.',
        'Eine Brandmauer ist die fensterlose Seitenwand eines Gebäudes und wird oft von weitem und aus dem fahrenden Verkehr gesehen. Sie eignet sich für eine einzige, grosse und einfache Botschaft. Eine Fassade zur Strasse wird von Fussgängern aus der Nähe gesehen, hier darf die Botschaft etwas mehr enthalten.',
        'Hyde Media übernimmt Druck, Montage und Demontage. Ob eine Bewilligung nötig ist, hängt von der Gemeinde ab: Wir klären das ab und reichen das Gesuch für Sie ein. Die Mindestbuchung beträgt 4 Wochen.',
        ...(range ? [`Unsere Fassadenflächen${cities ? ' in ' + cities : ''} messen ${range}.`] : []),
      ],
      faqHeading: 'Fragen zur Fassadenwerbung',
      faqs: [
        {
          q: 'Was ist Fassadenwerbung?',
          a: 'Fassadenwerbung ist ein grossformatiges Werbebanner an der Fassade oder Brandmauer eines Gebäudes, das eine Marke für eine bestimmte Periode mietet. Es ist nicht dasselbe wie die Beschriftung des eigenen Geschäfts: Es ist ein Aussenwerbemedium, das alle sehen, die vorbeikommen.',
        },
        {
          q: 'Was kostet Fassadenwerbung?',
          a: 'Preise erhalten Sie auf Anfrage. Sie hängen von Fläche, Lage, Periode und Produktion ab. Das Angebot umfasst Druck, Montage, Demontage und, falls nötig, das Bewilligungsgesuch. Anfragen an ' + EMAIL + ' oder ' + PHONE + '.',
        },
        {
          q: 'Braucht Fassadenwerbung eine Bewilligung?',
          a: 'Das hängt von der Gemeinde und vom Standort ab. Hyde Media klärt ab, welche Bewilligung nötig ist, und reicht das Gesuch für Sie ein. Mehr in den [FAQ](' + link('/faq') + ').',
        },
        {
          q: 'Was ist der Unterschied zwischen Fassade und Brandmauer?',
          a: 'Eine Brandmauer wird von weitem und aus dem Verkehr gesehen und eignet sich am besten für eine kurze Botschaft. Eine Fassade zur Strasse wird von Fussgängern aus der Nähe gesehen und kann etwas mehr Inhalt tragen.',
        },
        {
          q: 'Wie lange hängt ein Fassadenbanner?',
          a: 'Fassaden sind nicht an eine Bauzeit gebunden und eignen sich deshalb für längere Laufzeiten. Die Mindestbuchung beträgt 4 Wochen, die Periode wird im Angebot vereinbart.',
        },
        {
          q: 'Wo bieten Sie Fassadenwerbung an?',
          a: where
            ? 'Aktuell' + (cities ? ' in ' + cities : '') + ': ' + where + '. Alle Flächen finden Sie unter [Standorte](' + link('/standorte') + ').'
            : 'Derzeit sind keine Fassadenflächen online ausgeschrieben. Planen Sie eine Fassadenkampagne, [kontaktieren Sie uns](' + link('/contact') + '), und wir prüfen die Möglichkeiten an Ihrem Wunschort. Unsere aktuellen Gerüstflächen finden Sie unter [Standorte](' + link('/standorte') + ').',
        },
      ],
    };
  }

  return {
    heading: 'Facade advertising: long-term visibility on buildings',
    paragraphs: [
      'Facade advertising is a banner on a building’s facade or blank end wall. The space is not tied to building works, so it can be booked for longer periods and build awareness through repetition. That makes the facade the steady format in outdoor advertising: the same message, in the same place, day after day.',
      'A blank end wall has no windows and is often seen from a distance and from moving traffic, so it suits one big, simple message. A facade facing the street is seen up close by pedestrians, so the message can carry a little more.',
      'Hyde Media handles print, installation and removal. Whether a permit is needed depends on the municipality: we clarify it and submit the application for you. The minimum booking is 4 weeks.',
      ...(range ? [`Our facade spaces${cities ? ' in ' + cities : ''} measure ${range}.`] : []),
    ],
    faqHeading: 'Questions about facade advertising',
    faqs: [
      {
        q: 'What is facade advertising?',
        a: 'Facade advertising is a large-format banner on a building’s facade or blank end wall, rented by a brand for a set period. It is not the same as signage on your own shop: it is an outdoor medium seen by everyone who passes.',
      },
      {
        q: 'How much does facade advertising cost?',
        a: 'Prices are on request. They depend on the space, the location, the period and production. The quote covers print, installation, removal and, where needed, the permit application. Contact ' + EMAIL + ' or ' + PHONE + '.',
      },
      {
        q: 'Do I need a permit for facade advertising?',
        a: 'It depends on the municipality and the site. Hyde Media clarifies which permit is needed and submits the application for you. More in the [FAQ](' + link('/faq') + ').',
      },
      {
        q: 'What is the difference between a facade and a blank end wall?',
        a: 'A blank end wall is seen from a distance and from traffic, and works best for one short message. A facade facing the street is seen up close by pedestrians and can carry a little more content.',
      },
      {
        q: 'How long does a facade banner stay up?',
        a: 'Facades are not tied to building works, so they suit longer runs. The minimum booking is 4 weeks, and the period is agreed in the quote.',
      },
      {
        q: 'Where do you offer facade advertising?',
        a: where
          ? 'Currently' + (cities ? ' in ' + cities : '') + ': ' + where + '. All sites are listed under [locations](' + link('/standorte') + ').'
          : 'No facade spaces are listed online at the moment. If you are planning a facade campaign, [get in touch](' + link('/contact') + ') and we will look at the options at your preferred location. Our current scaffolding sites are listed under [locations](' + link('/standorte') + ').',
      },
    ],
  };
}

export function getServiceGuide(kind: GuideKind, locale: GuideLocale): ServiceGuide {
  if (kind === 'overview') return overviewGuide(locale);
  if (kind === 'scaffolding') return scaffoldingGuide(locale);
  return facadeGuide(locale);
}
