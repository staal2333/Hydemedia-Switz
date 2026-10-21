/**
 * "OOH in the media mix": what published research says about outdoor
 * advertising next to TV, social and search. Every figure names its source.
 * The figures come from US and UK studies as cited in OUTFRONT Media's 2026
 * media kit; they are not measured on our own sites, and the page says so.
 */
export interface Stat {
  value: string;
  label: string;
  source: string;
}

export interface Section {
  id: string;
  title: string;
  body: string;
  stats: Stat[];
}

export interface OohMix {
  eyebrow: string;
  title: string;
  lede: string;
  note: string;
  fitTitle: string;
  fit: string;
  sections: Section[];
  howTitle: string;
  how: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  cta: string;
  ctaButton: string;
  calculator: string;
}

export const oohMix: Record<'de' | 'en', OohMix> = {
  de: {
    eyebrow: 'Wissen',
    title: 'Aussenwerbung im Medienmix',
    lede: 'Aussenwerbung wirkt nicht nur für sich allein. Sie macht auch TV, Social Media und Suche wirksamer. Hier sind die wichtigsten Zahlen aus der Forschung an einem Ort.',
    note: 'Die Zahlen stammen aus amerikanischen und britischen Studien, wie sie im Mediakit 2026 von OUTFRONT Media zitiert werden. Sie sind nicht an unseren eigenen Standorten gemessen, zeigen aber, wie das Medium wirkt. Die Quelle steht bei jeder Zahl.',
    fitTitle: 'Gilt das auch für Gerüstwerbung?',
    fit: 'Die Studien messen Aussenwerbung als Kategorie: Plakatwände, Banner an Gebäuden, Werbung an Verkehrsmitteln und Stadtmobiliar. Gerüst- und Fassadenbanner gehören zu den Grossformaten an Gebäuden und wirken auf dieselbe Weise: Sie werden vor der Suche gesehen, sie schaffen Vertrauen, weil sie physisch präsent sind, und sie werden immer wieder von denen gesehen, die täglich dieselbe Strecke nehmen. Grossformate werden zudem am häufigsten fotografiert und geteilt. Die Zahlen sind nicht speziell an Gerüsten gemessen. Nutzen Sie sie deshalb als Erklärung, wie das Medium wirkt, nicht als Versprechen, was ein einzelner Standort leistet.',
    sections: [
      {
        id: 'erster-eindruck',
        title: 'Der erste Eindruck',
        body: 'Wenn Menschen eine Aussenwerbung sehen und der Marke auch auf Social Media oder in der Suche begegnen, kommt die Aussenwerbung fast immer zuerst. Sie weckt die Neugier, Suche und Social Media ernten sie danach. Deshalb unterschätzen Last-Click-Messungen die Aussenwerbung: Sie erhält selten den letzten Klick, setzt aber oft alles in Gang.',
        stats: [
          { value: '94 %', label: 'der Fälle kommt der Kontakt mit Aussenwerbung vor Social Media, wenn Menschen beides gesehen haben', source: 'Kochava, 2026' },
          { value: '96 %', label: 'der Fälle kommt der Kontakt mit Aussenwerbung vor der Suche, wenn Menschen beides gesehen haben', source: 'Kochava, 2026' },
        ],
      },
      {
        id: 'medienmix',
        title: 'Sie macht die anderen Medien besser',
        body: 'Kampagnen, die Aussenwerbung zu TV, Social Media oder Suche hinzufügen, schneiden deutlich besser ab als Kampagnen ohne. Das zeigen Analysen von Hunderten Kampagnen in der Effektivitätsdatenbank des IPA. Aussenwerbung wirkt als Verstärker: Sie sorgt dafür, dass Menschen die Marke wiedererkennen, wenn sie ihr erneut auf einem Bildschirm begegnen.',
        stats: [
          { value: '+61 %', label: 'höhere Wahrscheinlichkeit, mehr Neukunden zu gewinnen, wenn Aussenwerbung zu TV hinzukommt', source: 'Rapport/IPA Databank/Peter Field, 2025' },
          { value: '+34 %', label: 'höhere Wahrscheinlichkeit, den Marktanteil zu steigern, mit Aussenwerbung zusätzlich zu TV', source: 'Rapport/IPA Databank/Peter Field, 2025' },
          { value: '+80 %', label: 'höhere Wahrscheinlichkeit für einen erfolgreichen Geschäfts- oder Markeneffekt, wenn Aussenwerbung mit Suche kombiniert wird', source: 'Rapport/IPA Databank/Peter Field, 2025' },
          { value: '+27 %', label: 'höherer Ertrag, wenn Aussenwerbung, TV und Digital zusammen laufen', source: 'Analytic Partners, 2024' },
        ],
      },
      {
        id: 'vertrauen',
        title: 'Vertrauen, das ein Bildschirm nicht gibt',
        body: 'Es wird schwieriger, dem zu vertrauen, was man auf einem Bildschirm sieht. Eine Werbung in der realen Stadt zeigt, dass eine Marke echt, seriös und dort präsent ist, wo Menschen leben. Deshalb gehört Aussenwerbung zu den Medien, denen Menschen am meisten vertrauen.',
        stats: [
          { value: '72 %', label: 'vertrauen Aussenwerbung, mehr als jedem anderen Medium', source: 'Kantar/OUTFRONT, 2026' },
          { value: '75 %', label: 'halten Aussenwerbung für glaubwürdig, mehr als jedes andere Medium', source: 'Kantar/OUTFRONT, 2026' },
          { value: '4 von 10', label: 'sehen es als Zeichen von Stärke und Glaubwürdigkeit, wenn eine Marke im physischen Raum wirbt', source: 'Kantar/OUTFRONT, 2026' },
        ],
      },
      {
        id: 'teilen',
        title: 'Sie wird geteilt und gesucht',
        body: 'Ein grosses Banner in der Stadt wird fotografiert, geteilt und gesucht. Pro eingesetztem Dollar erzeugt Aussenwerbung in diesen Studien mehr Social-Media-Posts und mehr Suchen auf Social Media als andere Medien, sodass die Reichweite online weitergeht.',
        stats: [
          { value: '7×', label: 'mehr Social-Media-Posts pro Dollar als andere Medien', source: 'Comscore, 2022' },
          { value: '6,5×', label: 'mehr Video-Posts pro Dollar als andere Medien', source: 'Comscore, 2022' },
          { value: '5,9×', label: 'mehr Suchen auf Social Media pro Dollar als andere Medien', source: 'Comscore, 2022' },
        ],
      },
      {
        id: 'wirkung',
        title: 'Wirkung, die sich messen lässt',
        body: 'Aussenwerbung wird nicht in Klicks gemessen, aber sie lässt sich durchaus messen. Bekanntheit, Kaufbereitschaft, Website-Besuche und Ladenbesuche steigen, während die Kampagne läuft. Die Zahlen hier sind Durchschnitte aus den eigenen Wirkungsstudien eines Anbieters. Betrachten Sie sie deshalb als Richtwert, nicht als Garantie.',
        stats: [
          { value: '+36 %', label: 'höhere ungestützte Bekanntheit im Durchschnitt', source: 'OUTFRONT-Benchmarks 2019–2026, Comscore' },
          { value: '+20 %', label: 'höhere Kaufbereitschaft (Consideration) im Durchschnitt', source: 'OUTFRONT-Benchmarks 2019–2026, Comscore' },
          { value: '+176 %', label: 'mehr Website-Besuche im Durchschnitt', source: 'OUTFRONT-Benchmarks 2019–2026, Comscore' },
        ],
      },
    ],
    howTitle: 'So nutzen Sie das in Ihrer Planung',
    how: [
      '**Starten Sie mit der Aussenwerbung.** Lassen Sie das Banner zu Beginn der Kampagne hängen, damit es Bekanntheit aufbaut, bevor die digitalen Anzeigen starten.',
      '**Nutzen Sie denselben visuellen Auftritt.** Wenn das Motiv am Gerüst und die Anzeige auf dem Smartphone zusammenpassen, erkennen Menschen die Marke sofort.',
      '**Fassen Sie digital im selben Gebiet nach.** Richten Sie Social Media und Suche auf die Quartiere aus, in denen Ihre Standorte hängen.',
      '**Messen Sie das Richtige.** Verfolgen Sie während der Kampagne Suchen nach Ihrer Marke, direkten Traffic und Ladenbesuche, nicht nur Klicks.',
    ],
    faqTitle: 'Fragen und Antworten',
    faq: [
      { q: 'Wirkt Aussenwerbung zusammen mit digitalem Marketing?', a: 'Ja. Studien zeigen, dass der Kontakt mit Aussenwerbung in den allermeisten Fällen vor der Suche und dem Social-Media-Post kommt und dass Kampagnen, die Aussenwerbung mit Suche oder TV kombinieren, ihre Ziele häufiger erreichen. Die Aussenwerbung schafft die Bekanntheit, die digitalen Kanäle ernten sie.' },
      { q: 'Warum zeigt mein Attributionsmodell die Wirkung von Aussenwerbung nicht?', a: 'Weil die meisten Modelle den letzten Klick belohnen. Aussenwerbung erhält selten den letzten Klick, weckt aber oft die Neugier, die zur Suche führt. Messen Sie stattdessen Markensuchen, direkten Traffic und Besuche während der Kampagne und vergleichen Sie mit einer Periode ohne.' },
      { q: 'Wie viel des Budgets sollte in Aussenwerbung fliessen?', a: 'Das hängt vom Ziel ab. Bei Lancierungen und für Bekanntheit kann Aussenwerbung einen grossen Teil des Plans tragen. Bei Performance-Kampagnen wirkt sie am besten als Verstärker zusätzlich zu Suche und Social Media. Wir helfen gern, die richtige Aufteilung zu finden.' },
    ],
    cta: 'Möchten Sie sehen, wie Aussenwerbung in Ihre nächste Kampagne passt? Wir erstellen einen Vorschlag mit Standorten, Periode und erwarteter Reichweite.',
    ctaButton: 'Vorschlag anfordern',
    calculator: 'Kampagnenrechner ausprobieren',
  },
  en: {
    eyebrow: 'Insights',
    title: 'Outdoor advertising in the media mix',
    lede: 'Outdoor advertising does not only work on its own. It also makes TV, social and search work better. Here are the key figures from the research, in one place.',
    note: 'The figures come from US and UK studies as cited in OUTFRONT Media’s 2026 media kit. They are not measured on our own sites, but they show how the medium works. The source is given with each figure.',
    fitTitle: 'Does this apply to scaffolding advertising too?',
    fit: 'The studies measure outdoor advertising as a category: billboards, building banners, transit and street furniture. Scaffolding and facade banners are large formats on buildings, and they work the same way: they are seen before the search, they build trust because they are physically present, and they are seen again and again by people who take the same route every day. Large formats are also the ones most often photographed and shared. The figures are not measured on scaffolding specifically, so use them to explain how the medium works, not as a promise of what one site delivers.',
    sections: [
      {
        id: 'first-impression',
        title: 'The first impression',
        body: 'When people both see an outdoor ad and meet the brand on social media or in a search, the outdoor ad almost always comes first. It creates the curiosity, and search and social harvest it afterwards. That is why last-click measurement undervalues outdoor: it rarely gets the last click, but it often starts everything.',
        stats: [
          { value: '94%', label: 'of the time outdoor exposure comes before social, when people have seen both', source: 'Kochava, 2026' },
          { value: '96%', label: 'of the time outdoor exposure comes before search, when people have seen both', source: 'Kochava, 2026' },
        ],
      },
      {
        id: 'media-mix',
        title: 'It makes the other media better',
        body: 'Campaigns that add outdoor to TV, social or search perform markedly better than campaigns without it. That is what analyses of hundreds of campaigns in the IPA effectiveness databank show. Outdoor works as an amplifier: it makes people recognise the brand when they meet it again on a screen.',
        stats: [
          { value: '+61%', label: 'more likely to improve customer acquisition when outdoor is added to TV', source: 'Rapport/IPA Databank/Peter Field, 2025' },
          { value: '+34%', label: 'more likely to improve market share with outdoor added to TV', source: 'Rapport/IPA Databank/Peter Field, 2025' },
          { value: '+80%', label: 'more likely to achieve a successful business or brand outcome when outdoor is combined with search', source: 'Rapport/IPA Databank/Peter Field, 2025' },
          { value: '+27%', label: 'higher return when outdoor, TV and digital run together', source: 'Analytic Partners, 2024' },
        ],
      },
      {
        id: 'trust',
        title: 'Trust a screen cannot give',
        body: 'It is getting harder to trust what you see on a screen. An ad in the physical city shows that a brand is real, serious and present where people live. That is why outdoor is one of the media people trust most.',
        stats: [
          { value: '72%', label: 'trust outdoor advertising, more than any other medium', source: 'Kantar/OUTFRONT, 2026' },
          { value: '75%', label: 'find outdoor advertising credible, more than any other medium', source: 'Kantar/OUTFRONT, 2026' },
          { value: '4 in 10', label: 'see a brand advertising in the physical world as a sign of confidence and legitimacy', source: 'Kantar/OUTFRONT, 2026' },
        ],
      },
      {
        id: 'sharing',
        title: 'It gets shared and searched',
        body: 'A big banner in the city gets photographed, shared and searched for. Per dollar spent, outdoor drove more social posts and social searches than other media in these studies, so the reach continues online.',
        stats: [
          { value: '7×', label: 'more social posts per dollar than other media', source: 'Comscore, 2022' },
          { value: '6.5×', label: 'more video posts per dollar than other media', source: 'Comscore, 2022' },
          { value: '5.9×', label: 'more social searches per dollar than other media', source: 'Comscore, 2022' },
        ],
      },
      {
        id: 'impact',
        title: 'Impact you can measure',
        body: 'Outdoor is not measured in clicks, but it can certainly be measured. Awareness, consideration, website visits and store visits rise while the campaign is up. These figures are averages from one provider’s own effect studies, so treat them as a benchmark rather than a guarantee.',
        stats: [
          { value: '+36%', label: 'average lift in unaided awareness', source: 'OUTFRONT benchmarks 2019–2026, Comscore' },
          { value: '+20%', label: 'average lift in consideration', source: 'OUTFRONT benchmarks 2019–2026, Comscore' },
          { value: '+176%', label: 'average lift in website visits', source: 'OUTFRONT benchmarks 2019–2026, Comscore' },
        ],
      },
    ],
    howTitle: 'How to use it in your plan',
    how: [
      '**Start with outdoor.** Put the banner up at the start of the campaign so it builds awareness before the digital ads begin.',
      '**Use the same look.** When the image on the scaffolding and the ad on the phone match, people recognise the brand straight away.',
      '**Follow up digitally in the same area.** Target social and search at the neighbourhoods where your sites are.',
      '**Measure the right things.** Track brand searches, direct traffic and store visits during the campaign, not just clicks.',
    ],
    faqTitle: 'Questions and answers',
    faq: [
      { q: 'Does outdoor advertising work with digital marketing?', a: 'Yes. Studies show that outdoor exposure comes before the search and the social post in the vast majority of cases, and that campaigns combining outdoor with search or TV more often reach their goals. Outdoor creates the awareness, and the digital channels harvest it.' },
      { q: 'Why does my attribution model not show the effect of outdoor?', a: 'Because most models credit the last click. Outdoor rarely gets the last click, but it often creates the curiosity that leads to the search. Measure brand searches, direct traffic and visits during the period instead, and compare with a period without.' },
      { q: 'How much of the budget should go to outdoor?', a: 'It depends on the goal. For launches and awareness, outdoor can carry a large part of the plan. For performance campaigns it works best as an amplifier on top of search and social. We are happy to help find the right split.' },
    ],
    cta: 'Want to see how outdoor fits your next campaign? We will put together a proposal with sites, period and expected reach.',
    ctaButton: 'Get a proposal',
    calculator: 'Try the campaign calculator',
  },
};
