/**
 * FAQ page content. One source for the visible page and its FAQPage
 * structured data.
 *
 * Every answer states only what the rest of the site already says: the terms
 * of sale (content/legal/terms.ts), the service guides, the glossary, the
 * placement data and the blog. If a fact changes there, change it here too.
 * In particular the booking, payment, move, cancellation, print-data and
 * complaint rules below are a summary of the AGB; the AGB prevail.
 *
 * Answers open with a direct answer to the question, so the first sentence
 * can stand alone as a search snippet. Text supports one inline mark:
 *   [label](/path) → link
 */

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  lede: string;
  jump: string;
  groups: FaqGroup[];
  note: string;
  cta: string;
  ctaButton: string;
  ctaSecondary: string;
}

const EMAIL = 'theodor.staal@hydemedia.ch';
const PHONE = '+41 77 233 81 21';
const MAIL_LINK = `[${EMAIL}](mailto:${EMAIL})`;
const PHONE_LINK = `[${PHONE}](tel:${PHONE.replace(/\s/g, '')})`;

export const faq: Record<'de' | 'en', FaqContent> = {
  de: {
    eyebrow: 'FAQ',
    title: 'Häufige Fragen',
    lede: 'Was Sie vor der Buchung von Gerüst- und Fassadenwerbung wissen sollten: Buchung, Preise, Bewilligung, Druck, Laufzeit und Wirkung, kurz beantwortet.',
    jump: 'Zum Thema',
    groups: [
      {
        id: 'buchung-preise',
        title: 'Buchung & Preise',
        items: [
          {
            id: 'buchen',
            q: 'Wie buche ich eine Werbefläche bei Hyde Media?',
            a: `Sie wählen eine Fläche unter [Standorte](/de/standorte) und fragen sie per E-Mail an ${EMAIL}, telefonisch unter ${PHONE} oder über das [Kontaktformular](/de/contact) an. Sie erhalten eine Offerte, die 30 Tage gültig ist. Der Vertrag kommt zustande, wenn wir Ihre schriftliche Annahme erhalten oder Ihre Bestellung mit einer Auftragsbestätigung bestätigen. Erst dann ist der Standort für Sie reserviert. Einwände gegen die Auftragsbestätigung melden Sie innert 5 Arbeitstagen.`,
          },
          {
            id: 'kosten',
            q: 'Was kostet Gerüst- oder Fassadenwerbung?',
            a: `Preise erhalten Sie auf Anfrage, eine Preisliste gibt es nicht. Der Preis hängt von Standort, Grösse, Periode und Produktion ab. Sie erhalten eine Offerte in Schweizer Franken, zuzüglich Mehrwertsteuer, die Druck, Montage, Demontage und das Bewilligungsgesuch umfasst. Anfragen richten Sie an ${EMAIL} oder ${PHONE}, oder Sie nutzen das [Kontaktformular](/de/contact). Wie viele Kontakte eine Laufzeit bringt, rechnen Sie vorab im [Kampagnenrechner](/de/kampagnenrechner) aus.`,
          },
          {
            id: 'preis-inbegriffen',
            q: 'Was ist im Preis enthalten?',
            a: 'In der Regel umfasst der Preis Mediamiete, Druckproduktion, Montage, Demontage und die Gebühren für Bewilligungen. Verbindlich ist, was in der Offerte oder Auftragsbestätigung steht. Leistungen, die dort nicht aufgeführt sind, werden nach Vereinbarung separat verrechnet. Ändern sich nach der Auftragsbestätigung öffentliche Abgaben, Gebühren oder Bewilligungsauflagen, die ausserhalb des Einflussbereichs von Hyde Media liegen, können diese weiterverrechnet werden. Sie liefern das Motiv als druckfertige Daten, um den Rest kümmern wir uns.',
          },
          {
            id: 'zahlung',
            q: 'Welche Zahlungsbedingungen gelten?',
            a: 'Die Zahlungsfrist beträgt 30 Tage netto ab Rechnungsdatum. Sofern die Auftragsbestätigung nichts anderes vorsieht, wird der Auftrag bei Vertragsschluss in Rechnung gestellt. Bei Sonderanfertigungen, etwa ungewöhnlichen Formaten oder Materialien, kann Hyde Media die Bezahlung der Produktion vor deren Beginn verlangen. Nach Ablauf der Frist gilt ein Verzugszins von 5 % pro Jahr. Ist eine fällige Zahlung nicht eingegangen, kann die Kampagne aufgeschoben werden, ohne dass sich ihre Dauer verlängert. Alle Bedingungen stehen in den [AGB](/de/terms).',
          },
          {
            id: 'agenturen',
            q: 'Können Mediaagenturen bei Hyde Media buchen?',
            a: 'Ja, Mediaagenturen können im Namen eines Werbetreibenden buchen. Agentur und Werbetreibender haften dann solidarisch für den Vertrag, sofern nichts anderes schriftlich vereinbart ist. Allfällige Agenturkommissionen oder Rabatte werden separat vereinbart und gelten nur für die Mediamiete, nicht für Produktion, Montage und Gebühren. Die [AGB](/de/terms) gelten ausschliesslich zwischen Unternehmen, der Vertrag untersteht Schweizer Recht, und Gerichtsstand ist Basel. Mehr unter [Für Marken](/de/brands).',
          },
        ],
      },
      {
        id: 'standorte-formate',
        title: 'Standorte & Formate',
        items: [
          {
            id: 'formate',
            q: 'Welche Werbeformate bietet Hyde Media in der Schweiz an?',
            a: 'Hyde Media vermarktet in der Schweiz zwei Grossformate: [Gerüstwerbung](/de/scaffolding) und [Fassadenwerbung](/de/facade). Bei der Gerüstwerbung hängt eine bedruckte Werbeblache am Baugerüst einer Liegenschaft, die renoviert wird. Bei der Fassadenwerbung hängt sie an einer Fassade oder Brandmauer. Digitale Bildschirme bieten wir in der Schweiz nicht an. Grossflächige Banner dieser Art werden auch Megaposter genannt; Gerüstbanner messen oft weit über hundert Quadratmeter.',
          },
          {
            id: 'standorte',
            q: 'Wo hat Hyde Media aktuell Werbeflächen?',
            a: "Unsere aktuellen Flächen liegen in Basel, am Riehenring nahe der Messe Basel. Der [Riehenring 141](/de/standorte/riehenring-141) bietet 175 m² Gerüstfläche an einer Ampelkreuzung mit 39'851 Kontakten pro Tag, der [Riehenring 70](/de/standorte/riehenring-70) 125 m² an einer Kreuzung mit Tramlinie. Periode und Belegung sehen Sie auf der Seite jedes Standorts. Neue Gerüstflächen entstehen, wenn Sanierungen beginnen. Alle Flächen finden Sie unter [Standorte](/de/standorte), mehr zu Basel unter [Gerüstwerbung in Basel](/de/geruestwerbung-basel).",
          },
          {
            id: 'geruest-oder-fassade',
            q: 'Was ist der Unterschied zwischen Gerüstwerbung und Fassadenwerbung?',
            a: 'Gerüstwerbung hängt an einem Baugerüst und ist an die Dauer der Bauarbeiten gebunden, Fassadenwerbung hängt direkt an einer Gebäudewand und eignet sich für längere, planbare Laufzeiten. Das Gerüst bietet sehr grosse Flächen an Lagen, an denen sonst keine Werbung möglich ist, und passt zu Lancierungen und Aktionen. Die Fassade baut Bekanntheit durch Wiederholung auf. Bei beiden Formaten beträgt die Mindestbuchung 4 Wochen. Mehr im Beitrag [Gerüstbanner oder Fassadenwerbung](/de/blog/geruest-vs-fassade-richtige-wahl).',
          },
          {
            id: 'flaeche-vermieten',
            q: 'Kann ich mein Baugerüst oder meine Fassade als Werbefläche vermieten?',
            a: 'Ja. Hyde Media mietet Gerüst- und Fassadenflächen von Liegenschaftseigentümern und kümmert sich um Werbekunden, Montage und das Bewilligungsgesuch. Die Miete wird in einer separaten Vereinbarung mit der Eigentümerschaft geregelt. Gegenüber den Werbekunden behält sich Hyde Media vor, Werbemittel abzulehnen, die gegen die Vorgaben der Eigentümerschaft verstossen oder ihrem Ansehen schaden können. Mehr [für Liegenschaftseigentümer](/de/property-owners).',
          },
        ],
      },
      {
        id: 'bewilligung',
        title: 'Bewilligung',
        items: [
          {
            id: 'reklamebewilligung',
            q: 'Braucht Gerüstwerbung eine Reklamebewilligung?',
            a: 'In aller Regel ja. Gemäss Signalisationsverordnung braucht eine Strassenreklame grundsätzlich eine Bewilligung der nach kantonalem Recht zuständigen Behörde, und Kantone und Gemeinden haben eigene Vorschriften, etwa zum Ortsbild. Sie müssen sich nicht selbst darum kümmern: Hyde Media holt die Reklamebewilligung bei der zuständigen Behörde ein, ebenso die Zustimmung der Eigentümerschaft der Liegenschaft. Die Bewilligung muss vorliegen, bevor das Banner hängt. Mehr im Beitrag [Bewilligungen für Gerüstwerbung in der Schweiz](/de/blog/bewilligungen-geruestwerbung-schweiz).',
          },
          {
            id: 'bewilligung-basel',
            q: 'Wer erteilt in Basel die Reklamebewilligung?',
            a: 'In Basel-Stadt werden Reklamen im Baubewilligungsverfahren behandelt, und die Gesuche gehen an das Bau- und Gastgewerbeinspektorat (BGI). Die Gestaltung beurteilt auf dem Stadtgebiet die Stadtbildkommission anhand des Reklamekonzepts des Kantons, in Riehen und Bettingen die Orts- bzw. Dorfbildkommission. In historischen Stadtteilen wird mehr Zurückhaltung verlangt als anderswo. Für den [Riehenring 141](/de/standorte/riehenring-141) hat die Stadt die Bewilligung bereits erteilt. Hyde Media reicht das Gesuch für Sie ein.',
          },
          {
            id: 'inhalte',
            q: 'Welche Werbeinhalte sind nicht erlaubt?',
            a: 'Das hängt von der Bewilligung des Standorts ab. Am Riehenring 141 in Basel sind zum Beispiel Werbung für Alkohol, politische Werbung und pornografische Inhalte ausgeschlossen. Hyde Media teilt Ihnen die bekannten Auflagen mit. Entspricht ein Motiv nicht den Auflagen, können Sie innerhalb der vereinbarten Fristen ein neues liefern. Unabhängig vom Standort sind Sie dafür verantwortlich, dass die Werbung dem geltenden Recht entspricht, etwa dem UWG, und dass Sie die Rechte an Texten, Bildern und Marken haben.',
          },
          {
            id: 'bewilligung-abgelehnt',
            q: 'Was passiert, wenn die Bewilligung nicht erteilt wird?',
            a: 'Dann bietet Hyde Media Ihnen einen gleichwertigen Standort oder Zeitraum an. Das gilt, wenn eine erforderliche Bewilligung aus Gründen, die Hyde Media nicht zu vertreten hat, nicht erteilt, widerrufen oder geändert wird. Nehmen Sie das Angebot nicht an, erstatten wir den bezahlten Betrag für den Teil der Kampagne, der nicht stattfinden kann. Eine weitergehende Haftung besteht nicht. So steht es in Ziffer 8.3 der [AGB](/de/terms).',
          },
        ],
      },
      {
        id: 'druck-montage',
        title: 'Druck & Montage',
        items: [
          {
            id: 'wer-druckt',
            q: 'Wer druckt und montiert das Banner?',
            a: 'Hyde Media übernimmt Druck, Montage und Demontage, Sie liefern nur das Motiv. Dafür arbeiten wir mit Druckereien und Montagefirmen zusammen und stehen für deren Arbeit wie für die eigene ein. Die Montage koordinieren wir mit dem Gerüstbauer oder der Liegenschaft und dokumentieren sie mit Fotos. Sie ist wetterabhängig: Bei starkem Wind wird verschoben. Am Ende der Periode nehmen wir das Banner wieder ab.',
          },
          {
            id: 'druckdaten',
            q: 'Welche Druckdaten braucht ein Gerüstbanner?',
            a: 'Am besten ein Vektor-PDF im Seitenverhältnis der Fläche, mit in Pfade umgewandelten Schriften und Farben in CMYK, angelegt im Massstab, den wir Ihnen nennen. Bilder brauchen volle Originalauflösung. Halten Sie Text und Logo innerhalb der sicheren Zonen, damit nichts hinter Gerüstrohren oder Befestigungen verschwindet. Viele Gerüstbanner werden auf Mesh gedruckt, ein Gewebe, durch das der Wind hindurchgeht; Farben wirken darauf etwas heller. Mehr unter [Druckdaten für Gerüstbanner](/de/blog/geruestbanner-druckdaten-spezifikationen-gestaltung).',
          },
          {
            id: 'abgabetermin',
            q: 'Bis wann müssen die Druckdaten vorliegen?',
            a: 'Druckfertige Daten müssen spätestens 10 Arbeitstage vor Kampagnenstart bei Hyde Media eingehen, sofern nichts anderes vereinbart ist. Kommen die Daten später oder in unbrauchbarer Qualität, kann sich der Start verzögern. Die Kampagnendauer verlängert sich dadurch nicht, und der Preis wird nicht reduziert. Lassen Sie sich die Spezifikationen deshalb direkt nach der Buchung geben. Wann welcher Schritt fällig ist, zeigt der Beitrag [Von der Buchung bis zum Banner](/de/blog/zeitplan-ooh-kampagne-buchung-bis-banner).',
          },
          {
            id: 'gestaltung',
            q: 'Gestaltet Hyde Media das Werbemotiv?',
            a: 'Das Motiv liefern Sie oder Ihre Agentur, Hyde Media übernimmt Druck und Montage. Wir geben Ihnen für jeden Standort Masse, Seitenverhältnis, sichere Zonen und Dateiformat und stimmen die Daten vor der Produktion mit Ihnen ab. Bewährt hat sich eine Gestaltung, die aus Distanz wirkt: wenige Worte, starker Kontrast, ein Bild und ein grosses Logo. Für Fehler in Daten, die Sie freigegeben haben, und für geringfügige Farbabweichungen, wie sie im Grossformatdruck üblich sind, haftet Hyde Media nicht.',
          },
          {
            id: 'schaden',
            q: 'Was passiert, wenn das Banner beschädigt wird?',
            a: 'Hyde Media behebt Schäden, etwa durch Vandalismus oder Sturm, innert angemessener Frist. Ist die Werbung aus Gründen, die Hyde Media zu vertreten hat, mehr als 3 aufeinanderfolgende Tage nicht sichtbar, wird die Kampagne entsprechend verlängert oder der Preis anteilmässig reduziert. Mängel melden Sie sofort, spätestens innert 5 Arbeitstagen, nachdem Sie sie entdeckt haben, schriftlich. Ansprüche aus Mängeln sind in jedem Fall spätestens 3 Monate nach Ende der Kampagne geltend zu machen.',
          },
        ],
      },
      {
        id: 'laufzeit-stornierung',
        title: 'Laufzeit & Stornierung',
        items: [
          {
            id: 'mindestdauer',
            q: 'Wie lange dauert eine Kampagne mindestens?',
            a: 'Die Mindestbuchung beträgt 4 Wochen, bei Gerüst- wie bei Fassadenwerbung. Ein Gerüstbanner kann so lange hängen, wie das Gerüst steht. Die verfügbare Periode ist bei jedem Standort angegeben, oft in Kalenderwochen (KW), zum Beispiel KW 44–47. Fassaden sind nicht an eine Bauzeit gebunden und eignen sich für längere Laufzeiten. Die genaue Periode wird in der Offerte vereinbart. Wie viele Kontakte eine Laufzeit bringt, zeigt der [Kampagnenrechner](/de/kampagnenrechner).',
          },
          {
            id: 'vorlauf',
            q: 'Wie früh muss ich eine Kampagne buchen?',
            a: 'So früh wie möglich, denn gute Gerüstflächen sind oft früh vergeben. Der Vorlauf hängt vor allem davon ab, ob der Standort im gewünschten Zeitraum frei ist, ob für ihn bereits eine Bewilligung vorliegt und ob Ihr Motiv fertig ist. Die Druckdaten müssen spätestens 10 Arbeitstage vor dem Start vorliegen. Bei einem fixen Termin wie einer Messe rechnen Sie vom Termin rückwärts und planen einen Puffer ein. Siehe [Von der Buchung bis zum Banner](/de/blog/zeitplan-ooh-kampagne-buchung-bis-banner).',
          },
          {
            id: 'verschieben',
            q: 'Kann ich eine gebuchte Kampagne verschieben?',
            a: 'Ja, einmalig und spätestens 8 Wochen vor dem vereinbarten Kampagnenstart. Voraussetzung ist, dass der Standort im gewünschten Zeitraum frei ist. Kosten, die bereits angefallen oder verbindlich ausgelöst sind, werden verrechnet. Die Verschiebung beantragen Sie schriftlich; sie wird mit dem Eingang Ihrer Mitteilung bei Hyde Media wirksam. Ein bestätigter Auftrag ist sonst verbindlich. Die Regeln stehen in Ziffer 5 der [AGB](/de/terms).',
          },
          {
            id: 'annullieren',
            q: 'Was kostet es, eine Kampagne zu annullieren?',
            a: 'Das hängt davon ab, wie lange vor dem Start Sie annullieren: Mehr als 12 Wochen vor Kampagnenstart werden 20 % des Mediapreises verrechnet, 6 bis 12 Wochen vorher 50 % und weniger als 6 Wochen vorher 100 %. Dazu kommen die bereits angefallenen oder verbindlich ausgelösten Kosten für Produktion und Bewilligungen. Die Annullierung teilen Sie schriftlich mit; sie wird mit dem Eingang bei Hyde Media wirksam. Statt zu annullieren, können Sie die Kampagne bis 8 Wochen vor Start einmal verschieben. Details in den [AGB](/de/terms).',
          },
          {
            id: 'geruest-abbau',
            q: 'Was passiert, wenn das Gerüst früher abgebaut wird?',
            a: 'Dann verschiebt oder verkürzt sich die Kampagne entsprechend, und Hyde Media bietet Ihnen einen anderen Zeitraum oder Standort an. Gerüstflächen sind an Bauprojekte gebunden, und ihre Verfügbarkeit hängt vom Bauprogramm ab. Wird das Bauvorhaben verschoben oder verkürzt, ändert sich auch die Periode. Wir informieren Sie so rasch wie möglich. Nehmen Sie das Angebot eines anderen Zeitraums oder Standorts nicht an, wird der Preis für den nicht erbrachten Teil anteilmässig reduziert.',
          },
        ],
      },
      {
        id: 'wirkung-messung',
        title: 'Wirkung & Messung',
        items: [
          {
            id: 'kontakte',
            q: 'Wie viele Menschen sehen ein Gerüstbanner?',
            a: "Das zeigen die Kontakte pro Tag, die wir für jeden Standort angeben: Am Riehenring in Basel sind es 39'851. Über die Mindestbuchung von 4 Wochen ergibt das 39'851 × 7 × 4 = 1'115'828 Kontakte. Ein Kontakt ist eine Gelegenheit, die Werbung zu sehen; wer fünfmal vorbeikommt, zählt fünfmal. Die Reichweite zählt dagegen jede Person nur einmal. Andere Laufzeiten rechnen Sie im [Kampagnenrechner](/de/kampagnenrechner) durch, die Methode erklärt der Beitrag [Reichweite berechnen](/de/blog/reichweite-aussenwerbung-berechnen).",
          },
          {
            id: 'erfolg-messen',
            q: 'Wie misst man den Erfolg einer Kampagne mit Aussenwerbung?',
            a: 'Mit Befragungen vor und nach der Kampagne, den Suchanfragen nach Ihrer Marke und den Website-Besuchen aus der Region während der Laufzeit. Kontakte zeigen, wie viele Menschen die Kampagne sehen konnten, aber nicht, ob sie gewirkt hat. Legen Sie deshalb vor dem Start ein Ziel und eine Vergleichsbasis fest. Wo Menschen stehen bleiben, etwa an einer Ampel, kann ein QR-Code oder ein Aktionscode helfen. Mehr im Beitrag [So messen Sie den Erfolg Ihrer OOH-Kampagne](/de/blog/ooh-kampagnenerfolg-messen).',
          },
          {
            id: 'tkp',
            q: 'Was ist der Tausend-Kontakt-Preis (TKP)?',
            a: 'Der TKP ist der Preis für 1000 Kontakte: Kosten der Kampagne geteilt durch die Kontakte, mal 1000. Mit ihm vergleichen Sie Standorte und Medien mit unterschiedlichem Preis und unterschiedlicher Reichweite auf derselben Basis, etwa eine Gerüstfläche mit einem Plakatnetz oder einer Online-Kampagne. Ein Kontakt ist aber nicht in jedem Medium gleich viel wert: Ein grosses Banner, an dem man an der Ampel wartet, wirkt anders als eine kurz eingeblendete Anzeige. Weitere Begriffe erklärt das [OOH-Glossar](/de/glossar).',
          },
        ],
      },
    ],
    note: 'Die Antworten zu Buchung, Zahlung, Verschiebung, Annullierung, Druckdaten und Mängeln fassen unsere AGB zusammen. Massgebend ist der Text der [AGB](/de/terms).',
    cta: `Ihre Frage ist nicht dabei? Schreiben Sie an ${MAIL_LINK} oder rufen Sie an unter ${PHONE_LINK}. Hyde Media, Marktgasse 8, 4051 Basel.`,
    ctaButton: 'Kontakt aufnehmen',
    ctaSecondary: 'Standorte ansehen',
  },

  en: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    lede: 'What to know before you book scaffolding or facade advertising: booking, prices, permits, print, campaign length and results, answered briefly.',
    jump: 'Jump to topic',
    groups: [
      {
        id: 'booking-prices',
        title: 'Booking & prices',
        items: [
          {
            id: 'book',
            q: 'How do I book an advertising space with Hyde Media?',
            a: `Choose a space under [locations](/en/standorte) and enquire by email at ${EMAIL}, by phone on ${PHONE} or through the [contact form](/en/contact). You receive a quote that is valid for 30 days. The agreement is formed when we receive your written acceptance, or when we confirm your order with an order confirmation. Only then is the site reserved for you. Any objections to the order confirmation must be raised within 5 working days.`,
          },
          {
            id: 'cost',
            q: 'How much does scaffolding or facade advertising cost?',
            a: `Prices are on request; there is no price list. The price depends on site, size, period and production. You receive a quote in Swiss francs, plus VAT, covering print, installation, removal and the permit application. Send enquiries to ${EMAIL} or ${PHONE}, or use the [contact form](/en/contact). You can work out in advance how many contacts a campaign period delivers with the [campaign calculator](/en/kampagnenrechner).`,
          },
          {
            id: 'included',
            q: 'What is included in the price?',
            a: 'The price typically covers media rental, print production, installation, removal and permit fees. What is binding is what the quote or order confirmation lists. Services not listed are invoiced separately as agreed. If public charges, fees or permit conditions outside Hyde Media’s control change after the order confirmation, they may be passed on. You supply the creative as print-ready artwork, and we take care of the rest.',
          },
          {
            id: 'payment',
            q: 'What are the payment terms?',
            a: 'Payment is due 30 days net from the invoice date. Unless the order confirmation says otherwise, the order is invoiced when the agreement is formed. For special production, such as non-standard formats or materials, Hyde Media may require payment for production before it starts. After the payment period, default interest of 5% per year applies. If an overdue payment has not arrived, the campaign may be postponed, and its period is not extended as a result. All conditions are in the [terms](/en/terms).',
          },
          {
            id: 'agencies',
            q: 'Can media agencies book with Hyde Media?',
            a: 'Yes, media agencies can book on behalf of an advertiser. The agency and the advertiser are then jointly and severally liable for the agreement unless otherwise agreed in writing. Any agency commission or discount is agreed separately and applies to media rental only, not to production, installation and fees. The [terms](/en/terms) apply between businesses only, the agreement is governed by Swiss law, and the place of jurisdiction is Basel. More [for brands](/en/brands).',
          },
        ],
      },
      {
        id: 'locations-formats',
        title: 'Locations & formats',
        items: [
          {
            id: 'formats',
            q: 'Which advertising formats does Hyde Media offer in Switzerland?',
            a: 'In Switzerland Hyde Media sells two large formats: [scaffolding advertising](/en/scaffolding) and [facade advertising](/en/facade). With scaffolding advertising, a printed banner hangs on the scaffolding of a building under renovation. With facade advertising, it hangs on a facade or blank end wall. We do not offer digital screens in Switzerland. Large banners like these are also called megaposters; scaffolding banners often measure well over a hundred square metres.',
          },
          {
            id: 'locations',
            q: 'Where does Hyde Media have advertising spaces right now?',
            a: "Our current spaces are in Basel, on Riehenring near Messe Basel. [Riehenring 141](/en/standorte/riehenring-141) offers 175 m² of scaffolding space at a traffic-light junction with 39'851 contacts per day, and [Riehenring 70](/en/standorte/riehenring-70) offers 125 m² at a junction with a tram line. Each site’s page shows its period and whether it is booked. New scaffolding sites appear when renovations start. All spaces are listed under [locations](/en/standorte), and more on Basel is under [scaffolding advertising in Basel](/en/geruestwerbung-basel).",
          },
          {
            id: 'scaffolding-or-facade',
            q: 'What is the difference between scaffolding and facade advertising?',
            a: 'Scaffolding advertising hangs on scaffolding and is tied to the length of the building works, while facade advertising hangs directly on a building wall and suits longer, more predictable runs. Scaffolding offers very large spaces in places where advertising normally cannot go, and suits launches and promotions. A facade builds awareness through repetition. For both formats the minimum booking is 4 weeks. Read more in [scaffolding or facade](/en/blog/geruest-vs-fassade-richtige-wahl).',
          },
          {
            id: 'rent-out',
            q: 'Can I rent out my scaffolding or facade as advertising space?',
            a: 'Yes. Hyde Media rents facade and scaffolding space from property owners and handles advertisers, installation and the permit application. The lease is set out in a separate agreement with the owner. Towards advertisers, Hyde Media reserves the right to reject advertising that breaches the owner’s requirements or could harm the owner’s reputation. Read more [for property owners](/en/property-owners).',
          },
        ],
      },
      {
        id: 'permits',
        title: 'Permits',
        items: [
          {
            id: 'permit',
            q: 'Does scaffolding advertising need a permit?',
            a: 'Generally, yes. Under the Swiss Road Signs Ordinance (SSV), roadside advertising in principle needs a permit from the authority responsible under cantonal law, and cantons and municipalities have their own rules, for example on the townscape. You do not have to deal with it yourself: Hyde Media obtains the advertising permit from the responsible authority and the consent of the property owner. The permit must be in place before the banner goes up. Read more in [permits for scaffolding advertising in Switzerland](/en/blog/bewilligungen-geruestwerbung-schweiz).',
          },
          {
            id: 'permit-basel',
            q: 'Who grants advertising permits in Basel?',
            a: 'In Basel-Stadt, advertising is handled through the building permit procedure, and applications go to the Building and Hospitality Inspectorate (Bau- und Gastgewerbeinspektorat, BGI). Within the city, the design is assessed by the Townscape Commission (Stadtbildkommission) against the canton’s advertising concept; in Riehen and Bettingen by their local commissions. More restraint is expected in historic districts than elsewhere. For [Riehenring 141](/en/standorte/riehenring-141) the city has already granted the permit. Hyde Media submits the application for you.',
          },
          {
            id: 'content',
            q: 'What advertising content is not allowed?',
            a: 'It depends on the site’s permit. At Riehenring 141 in Basel, for example, alcohol advertising, political advertising and pornographic content are excluded. Hyde Media tells you about the conditions it knows of. If a creative does not meet them, you can supply a new one within the agreed deadlines. Whatever the site, you are responsible for making sure the advertising complies with the law, such as the Swiss Unfair Competition Act (UWG), and that you hold the rights to the texts, images and trademarks.',
          },
          {
            id: 'permit-refused',
            q: 'What happens if the permit is not granted?',
            a: 'Hyde Media then offers you an equivalent site or period. This applies when a required permit is refused, withdrawn or changed for reasons outside Hyde Media’s responsibility. If you do not accept the offer, we refund the amount paid for the part of the campaign that cannot take place. There is no further liability. This is set out in section 8.3 of the [terms](/en/terms).',
          },
        ],
      },
      {
        id: 'print-installation',
        title: 'Print & installation',
        items: [
          {
            id: 'who-prints',
            q: 'Who prints and installs the banner?',
            a: 'Hyde Media handles print, installation and removal; you only supply the creative. We work with printers and installation firms and stand behind their work as our own. We coordinate the installation with the scaffolder or the property and document it with photos. Installation depends on the weather: in strong wind it is moved to another day. When the period ends, we take the banner down again.',
          },
          {
            id: 'artwork',
            q: 'What print files does a scaffolding banner need?',
            a: 'Ideally a vector PDF in the space’s aspect ratio, with fonts converted to outlines and colours in CMYK, set up at the scale we give you. Images need full original resolution. Keep text and logo inside the safe zones so nothing disappears behind scaffold tubes or fixings. Many scaffolding banners are printed on mesh, a fabric the wind passes through; colours look slightly lighter on it. Read more in [print files for scaffolding banners](/en/blog/geruestbanner-druckdaten-spezifikationen-gestaltung).',
          },
          {
            id: 'artwork-deadline',
            q: 'When are the print files due?',
            a: 'Print-ready files must reach Hyde Media no later than 10 working days before the campaign starts, unless agreed otherwise. If the files arrive late or in unusable quality, the start may be delayed. The campaign period is not extended as a result and the price is not reduced. So ask for the specifications straight after booking. When each step is due is shown in [from booking to banner](/en/blog/zeitplan-ooh-kampagne-buchung-bis-banner).',
          },
          {
            id: 'design',
            q: 'Does Hyde Media design the creative?',
            a: 'You or your agency supply the creative, and Hyde Media handles print and installation. For each site we give you the dimensions, aspect ratio, safe zones and file format, and we check the files with you before production. Designs that work from a distance do best: few words, strong contrast, one image and a large logo. Hyde Media is not liable for errors in files you have approved, or for minor colour deviations that are normal in large-format print.',
          },
          {
            id: 'damage',
            q: 'What happens if the banner is damaged?',
            a: 'Hyde Media repairs damage, for example from vandalism or storms, within a reasonable time. If the advertising is not visible for more than 3 consecutive days for reasons Hyde Media is responsible for, the campaign is extended accordingly or the price is reduced pro rata. Report defects in writing at once, and at the latest within 5 working days of discovering them. Claims for defects must in any case be made no later than 3 months after the campaign ends.',
          },
        ],
      },
      {
        id: 'duration-cancellation',
        title: 'Duration & cancellation',
        items: [
          {
            id: 'minimum',
            q: 'What is the minimum campaign length?',
            a: 'The minimum booking is 4 weeks, for both scaffolding and facade advertising. A scaffolding banner can stay up for as long as the scaffolding stands. The available period is shown for each site, often in calendar weeks (CW), for example CW 44–47. Facades are not tied to building works and suit longer runs. The exact period is agreed in the quote. The [campaign calculator](/en/kampagnenrechner) shows how many contacts a period delivers.',
          },
          {
            id: 'lead-time',
            q: 'How far ahead should I book a campaign?',
            a: 'As early as possible, because good scaffolding sites are often taken early. The lead time depends mainly on whether the site is free in the period you want, whether it already has a permit, and whether your creative is ready. Print files are due no later than 10 working days before the start. With a fixed date such as a trade fair, count back from that date and build in a buffer. See [from booking to banner](/en/blog/zeitplan-ooh-kampagne-buchung-bis-banner).',
          },
          {
            id: 'move',
            q: 'Can I move a booked campaign to another period?',
            a: 'Yes, once, and no later than 8 weeks before the agreed campaign start. The site must be free in the period you want. Costs already incurred or committed are invoiced. Request the move in writing; it takes effect when Hyde Media receives your notice. Otherwise a confirmed order is binding. The rules are in section 5 of the [terms](/en/terms).',
          },
          {
            id: 'cancel',
            q: 'What does it cost to cancel a campaign?',
            a: 'It depends on how long before the start you cancel: more than 12 weeks before the campaign starts, 20% of the media price is charged; 6 to 12 weeks before, 50%; and less than 6 weeks before, 100%. Costs already incurred or committed for production and permits are added. Cancel in writing; it takes effect when Hyde Media receives your notice. Instead of cancelling, you can move the campaign once, up to 8 weeks before the start. Details in the [terms](/en/terms).',
          },
          {
            id: 'scaffolding-removed',
            q: 'What happens if the scaffolding comes down early?',
            a: 'The campaign then moves or becomes shorter accordingly, and Hyde Media offers you another period or site. Scaffolding sites are tied to building projects, and their availability depends on the building schedule. If the works are postponed or shortened, the period changes too. We let you know as soon as possible. If you do not accept the offer of another period or site, the price is reduced pro rata for the part not delivered.',
          },
        ],
      },
      {
        id: 'results-measurement',
        title: 'Results & measurement',
        items: [
          {
            id: 'contacts',
            q: 'How many people see a scaffolding banner?',
            a: "The daily contacts we give for each site tell you: on Riehenring in Basel the figure is 39'851. Over the minimum booking of 4 weeks that comes to 39'851 × 7 × 4 = 1'115'828 contacts. A contact is one opportunity to see the ad; someone passing five times counts five times. Reach, by contrast, counts each person once. Try other periods in the [campaign calculator](/en/kampagnenrechner), and see the method in [calculating outdoor reach](/en/blog/reichweite-aussenwerbung-berechnen).",
          },
          {
            id: 'measure',
            q: 'How do you measure the success of an outdoor campaign?',
            a: 'With surveys before and after the campaign, searches for your brand, and website visits from the region during the campaign. Contacts show how many people could see the campaign, not whether it worked. So set a goal and a baseline for comparison before the start. Where people stop, such as at traffic lights, a QR code or a promo code can help. Read more in [how to measure an OOH campaign](/en/blog/ooh-kampagnenerfolg-messen).',
          },
          {
            id: 'cpm',
            q: 'What is CPM (cost per thousand)?',
            a: 'CPM is the price of 1,000 contacts: the campaign cost divided by the contacts, times 1,000. It lets you compare sites and media with different prices and reach on the same basis, for example a scaffolding space against a poster network or an online campaign. But a contact is not worth the same in every medium: a large banner you wait in front of at the lights works differently from an ad that flashes past in a feed. More terms in the [OOH glossary](/en/glossar).',
          },
        ],
      },
    ],
    note: 'The answers on booking, payment, moving, cancellation, print files and defects summarise our terms. The text of the [terms](/en/terms) prevails.',
    cta: `Your question is not here? Email ${MAIL_LINK} or call ${PHONE_LINK}. Hyde Media, Marktgasse 8, 4051 Basel.`,
    ctaButton: 'Get in touch',
    ctaSecondary: 'See locations',
  },
};

/** "[label](/path)" → "label", for structured data and plain-text use. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
