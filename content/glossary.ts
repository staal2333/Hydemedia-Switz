/**
 * OOH glossary. Short, plain definitions of the terms buyers meet when they
 * book outdoor advertising. Written to be quoted: each entry stands alone,
 * opens with the definition, and links to the page where the term is sold.
 */
export interface Term {
  id: string;
  term: string;
  aka?: string;
  body: string;
}

export interface Glossary {
  eyebrow: string;
  title: string;
  lede: string;
  jump: string;
  terms: Term[];
}

export const glossary: Record<'de' | 'en', Glossary> = {
  de: {
    eyebrow: 'Glossar',
    title: 'Das OOH-Glossar',
    lede: 'Die Begriffe, denen Sie beim Buchen von Aussenwerbung begegnen, kurz und ohne Fachjargon erklärt.',
    jump: 'Zum Begriff',
    terms: [
      { id: 'aussenwerbung', term: 'Aussenwerbung', aka: 'Out-of-Home, OOH, Outdoor-Werbung', body: 'Aussenwerbung ist Werbung, die Menschen ausserhalb ihres Zuhauses erreicht: an Gerüsten, Fassaden, Brandmauern, Plakatstellen und im Verkehr. Sie wird auch Out-of-Home (OOH) genannt, lässt sich nicht überspringen oder blockieren, und Grossformate werden in kurzer Zeit von vielen Menschen gesehen. Siehe [unsere Leistungen](/de/services).' },
      { id: 'geruestwerbung', term: 'Gerüstwerbung', aka: 'Gerüstbanner, Baugerüstwerbung, Gerüstplane', body: 'Gerüstwerbung ist ein grossformatiges Werbebanner am Gerüst rund um ein Gebäude in Renovation. Die Fläche gibt es nur, solange das Gerüst steht, deshalb folgt die Periode der Bauzeit. Hyde Media übernimmt Druck, Montage, Demontage und das Bewilligungsgesuch. Siehe [Gerüstwerbung](/de/scaffolding).' },
      { id: 'fassadenwerbung', term: 'Fassadenwerbung', body: 'Fassadenwerbung ist ein Werbebanner an der Fassade eines Gebäudes, also an der Seite, die zur Strasse zeigt. Sie ist nicht an eine Baustelle gebunden, eignet sich für längere Laufzeiten und wird von Fussgängern aus der Nähe gesehen. Siehe [Fassadenwerbung](/de/facade).' },
      { id: 'brandmauerwerbung', term: 'Brandmauerwerbung', aka: 'Giebelwerbung', body: 'Brandmauerwerbung ist ein Werbebanner an der Brandmauer eines Gebäudes, der fensterlosen Seitenwand. Sie wird oft von weitem und aus dem Verkehr gesehen, deshalb muss die Botschaft kurz und gross sein. Siehe [Fassadenwerbung](/de/facade).' },
      { id: 'werbebanner', term: 'Werbebanner', aka: 'Blache, Bannerplane', body: 'Ein Werbebanner ist eine bedruckte Plane, die an einem Gerüst, einer Fassade oder einer Brandmauer befestigt wird. Bei Gerüst- und Fassadenwerbung wird das Banner im Grossformat gedruckt und nach der Kampagne wieder abgenommen.' },
      { id: 'building-wrap', term: 'Building Wrap', aka: 'Gebäudeverhüllung', body: 'Ein Building Wrap ist eine Kampagne, bei der das Banner das ganze oder fast das ganze Gebäude bedeckt. Das Format wird genutzt, wenn eine Marke für eine Periode einen ganzen Strassenraum besetzen will.' },
      { id: 'grossformat', term: 'Grossformat', body: 'Grossformat bezeichnet Aussenwerbung ab etwa 20 m², zum Beispiel Werbebanner an Gerüsten und Fassaden. Die Gerüstflächen von Hyde Media in Basel messen 125 m² und 175 m². Klassische Plakate messen dagegen nur wenige Quadratmeter.' },
      { id: 'mesh', term: 'Mesh-Banner', aka: 'Netzgewebe', body: 'Ein Mesh-Banner besteht aus Gewebe mit kleinen Löchern, durch die der Wind hindurchgeht. Es wird oft an Gerüsten eingesetzt, wo ein geschlossenes Material zu viel Wind fangen würde.' },
      { id: 'kontakt', term: 'Kontakt', aka: 'Impression', body: 'Ein Kontakt ist eine Gelegenheit für eine Person, die Werbung zu sehen. Die Zahl ist brutto: Wer fünfmal vorbeikommt, zählt als fünf Kontakte.' },
      { id: 'ots', term: 'OTS', aka: 'Opportunity to See, Sehchance', body: 'OTS ist die Anzahl der Gelegenheiten, eine Werbung in einer Periode zu sehen. Der Begriff wird oft gleichbedeutend mit Kontakten verwendet.' },
      { id: 'kontakte-pro-tag', term: 'Kontakte pro Tag', aka: 'Verkehrszahlen, Frequenz', body: "Kontakte pro Tag geben an, wie viele Menschen täglich an einem Standort vorbeikommen, zu Fuss, mit dem Velo, im Auto oder im Tram. Am Riehenring in Basel sind es 39'851 pro Tag. Die Zahl ist die Grundlage, um Standorte zu vergleichen. Probieren Sie den [Kampagnenrechner](/de/kampagnenrechner)." },
      { id: 'reichweite', term: 'Reichweite', aka: 'Reach', body: 'Die Reichweite gibt an, wie viele verschiedene Personen eine Kampagne mindestens einmal sehen. Sie zählt jede Person nur einmal, im Unterschied zu den Kontakten.' },
      { id: 'kontaktdosis', term: 'Kontaktdosis', aka: 'Frequency, durchschnittliche Kontakthäufigkeit', body: 'Die Kontaktdosis ist die Zahl, wie oft dieselbe Person eine Kampagne im Durchschnitt sieht. Eine hohe Kontaktdosis baut Wiedererkennung auf, vor allem an Strecken, die Menschen täglich nutzen.' },
      { id: 'tkp', term: 'TKP', aka: 'Tausend-Kontakt-Preis, CPM', body: 'Der TKP ist der Preis für 1000 Kontakte. Er dient dazu, Medien mit unterschiedlichem Preis und unterschiedlicher Reichweite zu vergleichen.' },
      { id: 'kampagnenperiode', term: 'Kampagnenperiode', aka: 'Laufzeit, Flight, Kalenderwoche (KW)', body: 'Die Kampagnenperiode ist der Zeitraum, in dem die Werbung hängt. Bei Hyde Media beträgt die Mindestbuchung 4 Wochen, und Perioden werden oft in Kalenderwochen angegeben, zum Beispiel KW 44–47. Siehe [Standorte](/de/standorte).' },
      { id: 'druckdaten', term: 'Druckdaten', aka: 'druckfertige Daten', body: 'Druckdaten sind die fertige Gestaltung in der Auflösung und im Format, das die Druckerei braucht. Format und Abgabetermin stimmen wir bei der Buchung mit Ihnen ab.' },
      { id: 'bewilligung', term: 'Reklamebewilligung', aka: 'Bewilligung, Reklamegesuch', body: 'Die Reklamebewilligung ist die Erlaubnis der Stadt bzw. des Kantons für Werbung im öffentlichen Raum, zum Beispiel an einem Gerüst. Was gilt, hängt von der Gemeinde ab, und Bewilligungen können Auflagen enthalten: Am Riehenring 141 in Basel ist Werbung für Alkohol, Politik und pornografische Inhalte ausgeschlossen. Hyde Media klärt die Bewilligung ab und reicht das Gesuch für Sie ein. Siehe [FAQ](/de/faq).' },
      { id: 'einfallsachse', term: 'Einfallsachse', aka: 'Hauptverkehrsachse', body: 'Eine Einfallsachse ist eine grosse Strasse in die Stadt mit viel fliessendem Verkehr. Standorte hier erreichen viele Menschen, aber nur kurz, deshalb muss die Botschaft in wenigen Sekunden lesbar sein.' },
      { id: 'augenhoehe', term: 'Augenhöhe', aka: 'Street Level', body: 'Werbung auf Augenhöhe liegt im Blickfeld von Fussgängern, zum Beispiel ein Fassadenbanner im Erdgeschoss. Sie wird aus der Nähe und länger gesehen als grosse Formate weit oben.' },
    ],
  },
  en: {
    eyebrow: 'Glossary',
    title: 'The OOH glossary',
    lede: 'The terms you meet when you buy outdoor advertising, explained briefly and without jargon.',
    jump: 'Jump to term',
    terms: [
      { id: 'outdoor-advertising', term: 'Outdoor advertising', aka: 'OOH, out-of-home', body: 'Outdoor advertising is advertising that reaches people outside the home: on scaffolding, facades, blank end walls, poster sites and transport. Also called out-of-home (OOH), it cannot be skipped or blocked, and large formats are seen by many people quickly. See [our services](/en/services).' },
      { id: 'scaffolding-advertising', term: 'Scaffolding advertising', aka: 'scaffolding banner, scaffold wrap', body: 'Scaffolding advertising is a large-format banner on the scaffolding around a building under renovation. The space only exists while the scaffolding stands, so the period follows the building works. Hyde Media handles print, installation, removal and the permit application. See [scaffolding advertising](/en/scaffolding).' },
      { id: 'facade-advertising', term: 'Facade advertising', body: 'Facade advertising is a banner on a building’s facade, the side facing the street. It is not tied to building works, suits longer runs and is seen up close by pedestrians. See [facade advertising](/en/facade).' },
      { id: 'gable', term: 'Gable advertising', aka: 'blank wall advertising', body: 'Gable advertising is a banner on a building’s blank end wall, the side without windows. It is often seen from a distance and from traffic, so the message must be short and big. See [facade advertising](/en/facade).' },
      { id: 'banner', term: 'Advertising banner', body: 'An advertising banner is a printed sheet of material fixed to scaffolding, a facade or a blank wall. For scaffolding and facade advertising the banner is printed in large format and taken down again after the campaign.' },
      { id: 'building-wrap', term: 'Building wrap', body: 'A building wrap is a campaign where the banner covers all or nearly all of a building. It is used when a brand wants to own a whole street for a period.' },
      { id: 'large-format', term: 'Large format', body: 'Large format means outdoor advertising from about 20 m² upwards, such as banners on scaffolding and facades. Hyde Media’s scaffolding sites in Basel measure 125 m² and 175 m². Classic posters, by comparison, measure only a few square metres.' },
      { id: 'mesh', term: 'Mesh banner', body: 'A mesh banner is made of material with small holes that let the wind through. It is often used on scaffolding, where solid material would catch too much wind.' },
      { id: 'impression', term: 'Impression', aka: 'contact', body: 'An impression is one opportunity for one person to see the ad. The figure is gross: the same person passing five times counts as five impressions.' },
      { id: 'ots', term: 'OTS', aka: 'opportunity to see', body: 'OTS is the number of opportunities to see an ad in a period. It is often used to mean the same as impressions.' },
      { id: 'traffic', term: 'Daily contacts', aka: 'traffic figures', body: "Daily contacts are how many people pass a site each day, on foot, by bike, car or tram. On Riehenring in Basel the figure is 39'851 a day. It is the basis for comparing sites. Try the [campaign calculator](/en/kampagnenrechner)." },
      { id: 'reach', term: 'Reach', body: 'Reach is how many different people see a campaign at least once. It counts each person once, unlike impressions.' },
      { id: 'frequency', term: 'Frequency', body: 'Frequency is how many times the same person sees a campaign on average. High frequency builds recognition, especially on routes people take every day.' },
      { id: 'cpm', term: 'CPM', aka: 'cost per thousand, TKP', body: 'CPM is the price of 1,000 impressions. It is used to compare media with different prices and reach.' },
      { id: 'flight', term: 'Flight', aka: 'campaign period, calendar week (CW)', body: 'A flight is the period an ad is up. At Hyde Media the minimum booking is 4 weeks, and periods are often given in calendar weeks, for example CW 44–47. See [locations](/en/standorte).' },
      { id: 'artwork', term: 'Print-ready artwork', body: 'Print-ready artwork is the finished design in the resolution and format the printer needs. We agree the format and delivery date with you when you book.' },
      { id: 'permit', term: 'Advertising permit', body: 'An advertising permit is the city’s or canton’s approval of advertising in public space, for example on scaffolding. What applies depends on the municipality, and permits can come with conditions: at Riehenring 141 in Basel, alcohol, political and pornographic advertising is excluded. Hyde Media clarifies the permit and submits the application for you. See [FAQ](/en/faq).' },
      { id: 'arterial-road', term: 'Arterial road', body: 'An arterial road is a major road into the city with a lot of moving traffic. Sites here reach many people, but briefly, so the message must be readable in seconds.' },
      { id: 'eye-level', term: 'Eye level', aka: 'street level', body: 'Eye-level advertising sits in pedestrians’ line of sight, such as a ground-floor facade banner. It is seen up close and for longer than large formats high up.' },
    ],
  },
};
