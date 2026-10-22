import { COMPANY, companyName, type LegalDocs } from './types';

const C = COMPANY;

/*
 * Commercial parameters below (offer validity, payment terms, move and
 * cancellation rules, material deadline, complaint deadlines, outage
 * tolerance) are business decisions. They are kept in one place here so they
 * can be reviewed and changed without touching the rest of the document.
 *
 * Deliberately no reminder fee: under Swiss law a fee for reminders must be
 * agreed in advance, and none has been decided. Default interest follows the
 * statutory rate (Art. 104 OR) and is therefore written into the text.
 */
const P = {
  // Swiss offers are customarily valid for 30 days.
  offerDays: 30,
  objectionWorkingDays: 5,
  paymentDaysNet: 30,
  moveWeeksBefore: 8,
  // Cancellation fee as a share of the media price, by weeks before start.
  // A contractual penalty under Art. 160 ff. OR, which a court may reduce if
  // excessive (Art. 163 Abs. 3 OR), so the steps are kept moderate.
  cancel: { earlyWeeks: 12, lateWeeks: 6, early: 20, middle: 50, late: 100 },
  materialBusinessDays: 10,
  // Notice of defects "sofort" in the sense of Art. 201 OR.
  complaintWorkingDays: 5,
  absoluteComplaintMonths: 3,
  outageDaysBeforeCompensation: 3,
  forceMajeureDays: 30,
};

export const terms: LegalDocs = {
  de: {
    eyebrow: 'AGB',
    title: 'Allgemeine Geschäftsbedingungen',
    updated: 'Gültig für Aufträge ab dem 1. November 2026',
    tocLabel: 'Inhalt',
    pdf: { href: '/docs/hyde-media-agb.pdf', label: 'Als PDF herunterladen' },
    intro: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Buchung von Werbeflächen und damit verbundene Leistungen von ${companyName()}${C.legalName ? ' («Hyde Media»)' : ''}. Sie gelten ausschliesslich im Verkehr zwischen Unternehmen.`,
    sections: [
      {
        id: 'geltungsbereich',
        heading: '1. Geltungsbereich',
        blocks: [
          { clauses: [
            { n: '1.1', text: 'Diese AGB gelten für alle Offerten, Auftragsbestätigungen und Verträge über Werbeflächen an Baugerüsten (Gerüstwerbung) und an Fassaden (Fassadenwerbung) sowie über die damit verbundene Produktion, Montage und Demontage, sofern nicht schriftlich etwas anderes vereinbart ist.' },
            { n: '1.2', text: 'Auftraggeber ist das Unternehmen oder die Mediaagentur, das bzw. die den Auftrag erteilt («Auftraggeber»). Erteilt eine Mediaagentur den Auftrag im Namen eines Werbetreibenden, haften Agentur und Werbetreibender solidarisch für die Erfüllung des Vertrags, sofern nicht schriftlich etwas anderes vereinbart ist.' },
            { n: '1.3', text: 'Allgemeine Geschäfts- oder Einkaufsbedingungen des Auftraggebers gelten nur, wenn Hyde Media ihnen schriftlich zugestimmt hat.' },
            { n: '1.4', text: 'Verträge mit Liegenschaftseigentümern über die Miete von Werbeflächen werden in einer separaten Vereinbarung geregelt und fallen nicht unter diese AGB.' },
          ] },
        ],
      },
      {
        id: 'offerte',
        heading: '2. Offerte und Vertragsschluss',
        blocks: [
          { clauses: [
            { n: '2.1', text: `Offerten sind während ${P.offerDays} Tagen ab Ausstellung gültig, sofern in der Offerte nichts anderes steht. Standorte werden erst mit Vertragsschluss reserviert.` },
            { n: '2.2', text: 'Der Vertrag kommt zustande, wenn Hyde Media die schriftliche Annahme der Offerte durch den Auftraggeber erhält oder wenn Hyde Media eine erhaltene Bestellung mit einer Auftragsbestätigung bestätigt.' },
            { n: '2.3', text: `Der Auftraggeber prüft die Auftragsbestätigung und meldet allfällige Einwände spätestens ${P.objectionWorkingDays} Arbeitstage nach Erhalt. Danach ist die Auftragsbestätigung verbindlich.` },
          ] },
        ],
      },
      {
        id: 'preise',
        heading: '3. Preise',
        blocks: [
          { clauses: [
            { n: '3.1', text: 'Alle Preise verstehen sich in Schweizer Franken (CHF) zuzüglich der gesetzlichen Mehrwertsteuer.' },
            { n: '3.2', text: 'Die Offerte oder Auftragsbestätigung hält fest, was im Preis enthalten ist – typischerweise Mediamiete, Druckproduktion, Montage, Demontage und Gebühren für Bewilligungen. Nicht aufgeführte Leistungen werden nach Vereinbarung separat verrechnet.' },
            { n: '3.3', text: 'Hyde Media behält sich die Berichtigung offensichtlicher Schreib- und Rechenfehler vor. Änderungen von öffentlichen Abgaben, Gebühren und Bewilligungsauflagen, die nach der Auftragsbestätigung eintreten und ausserhalb des Einflussbereichs von Hyde Media liegen, können weiterverrechnet werden.' },
          ] },
        ],
      },
      {
        id: 'zahlung',
        heading: '4. Rechnungsstellung und Zahlung',
        blocks: [
          { clauses: [
            { n: '4.1', text: `Sofern die Auftragsbestätigung nichts anderes vorsieht, wird der Auftrag bei Vertragsschluss in Rechnung gestellt. Die Zahlungsfrist beträgt ${P.paymentDaysNet} Tage netto ab Rechnungsdatum.` },
            { n: '4.2', text: 'Bei Sonderanfertigungen, etwa ungewöhnlichen Formaten oder Materialien, kann Hyde Media die Bezahlung der Produktion vor deren Beginn verlangen.' },
            { n: '4.3', text: 'Mit Ablauf der Zahlungsfrist gerät der Auftraggeber ohne weitere Mahnung in Verzug und schuldet einen Verzugszins von 5 % pro Jahr (Art. 104 OR).' },
            { n: '4.4', text: 'Ist eine fällige Zahlung nicht eingegangen, kann Hyde Media die Kampagne bis zum Zahlungseingang aufschieben oder unterbrechen. Die Kampagnendauer verlängert sich dadurch nicht.' },
            { n: '4.5', text: 'Hyde Media kann von einem bestätigten Auftrag zurücktreten, wenn die Bonität des Auftraggebers nicht bestätigt werden kann oder wenn der Auftraggeber fällige, unbezahlte Rechnungen von Hyde Media hat.' },
          ] },
        ],
      },
      {
        id: 'annullierung',
        heading: '5. Verschiebung und Annullierung',
        blocks: [
          { clauses: [
            { n: '5.1', text: 'Ein bestätigter Auftrag ist für den Auftraggeber verbindlich.' },
            { n: '5.2', text: `Der Auftraggeber kann einmalig beantragen, die Kampagne in einen anderen Zeitraum zu verschieben, spätestens ${P.moveWeeksBefore} Wochen vor dem vereinbarten Kampagnenstart. Die Verschiebung setzt voraus, dass der Standort im gewünschten Zeitraum frei ist. Bereits angefallene oder verbindlich ausgelöste Kosten werden verrechnet.` },
            { n: '5.3', text: `Annulliert der Auftraggeber einen bestätigten Auftrag, werden die bereits angefallenen oder verbindlich ausgelösten Kosten für Produktion und Bewilligungen sowie folgender Anteil des Mediapreises verrechnet: mehr als ${P.cancel.earlyWeeks} Wochen vor Kampagnenstart ${P.cancel.early} %, ${P.cancel.lateWeeks} bis ${P.cancel.earlyWeeks} Wochen vorher ${P.cancel.middle} %, weniger als ${P.cancel.lateWeeks} Wochen vorher ${P.cancel.late} %.` },
            { n: '5.4', text: 'Annullierungen und Verschiebungen sind schriftlich mitzuteilen und werden mit dem Eingang der Mitteilung bei Hyde Media wirksam.' },
          ] },
        ],
      },
      {
        id: 'werbemittel',
        heading: '6. Werbemittel und Inhalt',
        blocks: [
          { clauses: [
            { n: '6.1', text: `Der Auftraggeber liefert druckfertige Daten gemäss den technischen Vorgaben von Hyde Media. Sofern nichts anderes vereinbart ist, müssen die Daten spätestens ${P.materialBusinessDays} Arbeitstage vor Kampagnenstart bei Hyde Media eingehen.` },
            { n: '6.2', text: 'Werden die Daten verspätet oder in unbrauchbarer Qualität geliefert, kann sich der Kampagnenstart verzögern. Die Kampagnendauer verlängert sich dadurch nicht, und der Preis wird nicht reduziert.' },
            { n: '6.3', text: 'Hyde Media haftet nicht für Fehler in Daten oder Gut-zum-Druck-Vorlagen, die der Auftraggeber freigegeben hat, und nicht für geringfügige Farbabweichungen, wie sie im Grossformatdruck üblich sind.' },
            { n: '6.4', text: 'Der Auftraggeber ist dafür verantwortlich, dass der Inhalt der Werbung dem geltenden Recht entspricht, namentlich dem Bundesgesetz gegen den unlauteren Wettbewerb (UWG) und den Vorschriften für bestimmte Produkte, und dass er über die erforderlichen Rechte an Texten, Bildern, Marken und abgebildeten Personen verfügt.' },
            { n: '6.5', text: 'Der Auftraggeber hält Hyde Media und die Eigentümerschaft der Liegenschaft schadlos für Ansprüche Dritter, die sich aus dem Inhalt der Werbung ergeben.' },
          ] },
        ],
      },
      {
        id: 'ablehnung',
        heading: '7. Recht von Hyde Media, Inhalte abzulehnen',
        blocks: [
          { clauses: [
            { n: '7.1', text: 'Hyde Media kann Werbemittel ablehnen oder deren Änderung verlangen, wenn sie nach Einschätzung von Hyde Media gegen das Gesetz, die Auflagen einer Bewilligung, die Vorgaben der Eigentümerschaft oder die Grundsätze der Lauterkeit in der kommerziellen Kommunikation verstossen oder das Ansehen von Hyde Media oder der Eigentümerschaft schädigen können.' },
            { n: '7.2', text: 'Wird ein Werbemittel abgelehnt, kann der Auftraggeber innerhalb der vereinbarten Fristen ein neues liefern. Kann die Kampagne nicht durchgeführt werden, weil der Auftraggeber kein zulässiges Werbemittel liefert, wird der Auftrag vollständig verrechnet.' },
          ] },
        ],
      },
      {
        id: 'bewilligungen',
        heading: '8. Bewilligungen',
        blocks: [
          { clauses: [
            { n: '8.1', text: 'Hyde Media holt die Reklamebewilligung bei der zuständigen Behörde ein, soweit eine solche erforderlich ist, sowie die Zustimmung der Eigentümerschaft der Liegenschaft.' },
            { n: '8.2', text: 'Bewilligungen können mit Auflagen verbunden sein und bestimmte Inhalte ausschliessen, zum Beispiel Werbung für alkoholische Getränke, politische Werbung oder pornografische Inhalte. Hyde Media teilt dem Auftraggeber die ihr bekannten Auflagen mit. Für Werbemittel, die den Auflagen nicht entsprechen, gilt Ziffer 7.2.' },
            { n: '8.3', text: 'Wird eine erforderliche Bewilligung aus Gründen, die Hyde Media nicht zu vertreten hat, nicht erteilt, widerrufen oder geändert, bietet Hyde Media einen gleichwertigen Standort oder Zeitraum an. Nimmt der Auftraggeber dieses Angebot nicht an, erstattet Hyde Media den bezahlten Betrag für den nicht erbrachten Teil der Kampagne. Eine weitergehende Haftung von Hyde Media besteht nicht.' },
          ] },
        ],
      },
      {
        id: 'leistung',
        heading: '9. Leistungserbringung, Montage und Unterhalt',
        blocks: [
          { clauses: [
            { n: '9.1', text: 'Hyde Media übernimmt Montage und Demontage, sofern nichts anderes vereinbart ist. Die Montage kann sich wegen der Witterung, etwa starkem Wind, oder wegen der Zugangsverhältnisse auf der Baustelle oder an der Liegenschaft verzögern.' },
            { n: '9.2', text: 'Gerüststandorte sind an Bauprojekte gebunden; ihre Verfügbarkeit hängt vom Bauprogramm ab. Wird das Bauvorhaben verschoben oder verkürzt oder das Gerüst früher als geplant abgebaut, kann sich die Kampagnendauer entsprechend verschieben oder verkürzen. Hyde Media informiert den Auftraggeber so rasch wie möglich und bietet einen anderen Zeitraum oder Standort an. Nimmt der Auftraggeber dieses Angebot nicht an, wird der Preis für den nicht erbrachten Teil des Zeitraums anteilmässig reduziert.' },
            { n: '9.3', text: `Wird eine Werbefläche beschädigt, etwa durch Vandalismus oder Sturm, behebt Hyde Media den Schaden innert angemessener Frist. Ist die Werbung aus Gründen, die Hyde Media zu vertreten hat, mehr als ${P.outageDaysBeforeCompensation} aufeinanderfolgende Tage nicht sichtbar, wird die Kampagnendauer entsprechend verlängert oder der Preis anteilmässig reduziert.` },
            { n: '9.4', text: 'Hyde Media dokumentiert die Montage mit Fotos.' },
          ] },
        ],
      },
      {
        id: 'maengelruege',
        heading: '10. Mängelrüge',
        blocks: [
          { clauses: [
            { n: '10.1', text: `Der Auftraggeber rügt Mängel sofort, spätestens innert ${P.complaintWorkingDays} Arbeitstagen, schriftlich, nachdem er sie entdeckt hat oder hätte entdecken müssen (Art. 201 OR).` },
            { n: '10.2', text: `Ansprüche aus Mängeln sind in jedem Fall spätestens ${P.absoluteComplaintMonths} Monate nach Ende der Kampagne geltend zu machen.` },
            { n: '10.3', text: 'Eine Mängelrüge berechtigt nicht dazu, Zahlungen für Teile des Auftrags zurückzubehalten, die von der Rüge nicht betroffen sind.' },
            { n: '10.4', text: 'Bei einer berechtigten Mängelrüge kann Hyde Media wählen, ob sie den Mangel behebt, die Kampagne verlängert, eine gleichwertige Leistung erbringt oder den Preis anteilmässig reduziert.' },
          ] },
        ],
      },
      {
        id: 'haftung',
        heading: '11. Haftung und Haftungsbeschränkung',
        blocks: [
          { clauses: [
            { n: '11.1', text: 'Hyde Media haftet nach den allgemeinen Bestimmungen des schweizerischen Obligationenrechts (OR), mit den Einschränkungen dieser AGB.' },
            { n: '11.2', text: 'Soweit gesetzlich zulässig, haftet Hyde Media nicht für indirekte Schäden und Folgeschäden wie Betriebsunterbruch, entgangenen Gewinn, Umsatzeinbussen oder Reputationsschäden.' },
            { n: '11.3', text: 'Soweit gesetzlich zulässig, ist die gesamte Haftung von Hyde Media auf den vereinbarten Preis des Auftrags beschränkt, auf den sich der Anspruch bezieht.' },
            { n: '11.4', text: 'Diese Beschränkungen gelten nicht für Schäden, die Hyde Media absichtlich oder grobfahrlässig verursacht hat (Art. 100 Abs. 1 OR), und nicht, soweit eine weitergehende Haftung gesetzlich zwingend ist.' },
          ] },
        ],
      },
      {
        id: 'hoehere-gewalt',
        heading: '12. Höhere Gewalt',
        blocks: [
          { clauses: [
            { n: '12.1', text: 'Hyde Media haftet nicht für Nichterfüllung oder Verzug, die auf Umstände ausserhalb ihres Einflussbereichs zurückgehen, namentlich aussergewöhnliche Witterung, Feuer, Streik, Epidemien, behördliche Anordnungen, Unterbrüche oder Änderungen von Bauprojekten sowie Verzögerungen bei Lieferanten aus denselben Gründen.' },
            { n: '12.2', text: `Während eines Ereignisses höherer Gewalt ruhen die betroffenen Pflichten, solange es andauert. Dauert es länger als ${P.forceMajeureDays} Tage, können beide Parteien vom betroffenen Teil des Auftrags zurücktreten, ohne schadenersatzpflichtig zu werden. Bezahlte Beträge für nicht erbrachte Leistungen werden erstattet.` },
          ] },
        ],
      },
      {
        id: 'referenz',
        heading: '13. Verwendung der Kampagne als Referenz',
        blocks: [
          { clauses: [
            { n: '13.1', text: 'Hyde Media darf die Kampagne fotografieren und filmen und die Aufnahmen zusammen mit Namen und Logo des Auftraggebers als Referenz auf der Website, in Präsentationen und in sozialen Medien verwenden.' },
            { n: '13.2', text: 'Wünscht der Auftraggeber dies nicht, teilt er es Hyde Media spätestens bei Kampagnenstart schriftlich mit.' },
          ] },
        ],
      },
      {
        id: 'agenturen',
        heading: '14. Mediaagenturen und Subunternehmer',
        blocks: [
          { clauses: [
            { n: '14.1', text: 'Allfällige Agenturkommissionen oder Rabatte werden separat vereinbart und gelten nur für die Mediamiete – nicht für Produktion, Montage, Gebühren und andere Kosten.' },
            { n: '14.2', text: 'Hyde Media kann die Leistungen ganz oder teilweise durch Subunternehmer erbringen lassen, etwa durch Druckereien und Montagefirmen. Hyde Media steht für deren Arbeit wie für die eigene ein.' },
          ] },
        ],
      },
      {
        id: 'datenschutz',
        heading: '15. Datenschutz',
        blocks: [
          { p: 'Hyde Media bearbeitet Personendaten der Kontaktpersonen des Auftraggebers, um den Vertrag durchzuführen und zu verwalten, und hält dabei das revidierte Bundesgesetz über den Datenschutz (revDSG) ein. Einzelheiten finden Sie in unserer [Datenschutzerklärung](/de/privacy).' },
        ],
      },
      {
        id: 'recht-gerichtsstand',
        heading: '16. Anwendbares Recht und Gerichtsstand',
        blocks: [
          { clauses: [
            { n: '16.1', text: 'Der Vertrag untersteht schweizerischem Recht, insbesondere dem Obligationenrecht. Das Übereinkommen der Vereinten Nationen über Verträge über den internationalen Warenkauf (Wiener Kaufrecht, CISG) ist ausgeschlossen.' },
            { n: '16.2', text: 'Die Parteien bemühen sich, Streitigkeiten zunächst einvernehmlich zu lösen.' },
            { n: '16.3', text: 'Ausschliesslicher Gerichtsstand ist Basel (Kanton Basel-Stadt).' },
          ] },
        ],
      },
      {
        id: 'aenderungen',
        heading: '17. Änderungen',
        blocks: [
          { p: 'Hyde Media kann diese AGB ändern. Änderungen gelten für Aufträge, die nach der Veröffentlichung bestätigt werden, und berühren bereits bestätigte Aufträge nicht.' },
        ],
      },
      {
        id: 'kontakt',
        heading: '18. Kontakt',
        blocks: [
          { ul: [
            `**${companyName()}**`,
            ...(C.uid ? [`UID: ${C.uid}`] : []),
            `${C.street}, ${C.postal}, ${C.country}`,
            `E-Mail: [${C.email}](mailto:${C.email})`,
            `Telefon: ${C.phone}`,
          ] },
        ],
      },
    ],
  },

  en: {
    eyebrow: 'Terms',
    title: 'Terms of sale and delivery',
    updated: 'Applies to orders confirmed from 1 November 2026',
    tocLabel: 'Contents',
    pdf: { href: '/docs/hyde-media-terms-of-sale.pdf', label: 'Download as PDF' },
    intro: `These terms apply to all agreements for the booking of advertising space and related services from ${companyName()}${C.legalName ? ' (“Hyde Media”)' : ''}. They apply between businesses only. In case of discrepancy, the German version prevails.`,
    sections: [
      {
        id: 'scope',
        heading: '1. Scope',
        blocks: [
          { clauses: [
            { n: '1.1', text: 'These terms apply to all quotes, order confirmations and agreements for advertising space on scaffolding (scaffolding banners) and on facades (facade banners), including related production, installation and removal, unless otherwise agreed in writing.' },
            { n: '1.2', text: 'The buyer (“the Advertiser”) is the company or media agency placing the order. Where a media agency orders on behalf of an advertiser, the agency and the advertiser are jointly and severally liable for the agreement unless otherwise agreed in writing.' },
            { n: '1.3', text: 'The Advertiser’s own general or purchasing terms only apply if Hyde Media has accepted them in writing.' },
            { n: '1.4', text: 'Agreements with property owners for the lease of advertising surfaces are governed by a separate agreement and are not covered by these terms.' },
          ] },
        ],
      },
      {
        id: 'quotes',
        heading: '2. Quotes and formation of agreement',
        blocks: [
          { clauses: [
            { n: '2.1', text: `Quotes are valid for ${P.offerDays} days from issue unless stated otherwise. Placements are only reserved once an agreement is formed.` },
            { n: '2.2', text: 'An agreement is formed when Hyde Media receives the Advertiser’s written acceptance, or when Hyde Media sends an order confirmation for an order received.' },
            { n: '2.3', text: `The Advertiser must check the order confirmation and raise any objections within ${P.objectionWorkingDays} working days of receipt. After that, the order confirmation is binding.` },
          ] },
        ],
      },
      {
        id: 'prices',
        heading: '3. Prices',
        blocks: [
          { clauses: [
            { n: '3.1', text: 'All prices are in Swiss francs (CHF) and exclude value added tax, which is added at the statutory rate.' },
            { n: '3.2', text: 'The quote or order confirmation states what the price includes — typically media rental, print production, installation, removal and permit fees. Services not listed are invoiced separately as agreed.' },
            { n: '3.3', text: 'Hyde Media reserves the right to correct obvious clerical and calculation errors. Changes in public charges, fees and permit conditions that occur after the order confirmation and are outside Hyde Media’s control may be passed on.' },
          ] },
        ],
      },
      {
        id: 'payment',
        heading: '4. Invoicing and payment',
        blocks: [
          { clauses: [
            { n: '4.1', text: `Unless the order confirmation states otherwise, the order is invoiced when the agreement is formed, with payment terms of ${P.paymentDaysNet} days net from the invoice date.` },
            { n: '4.2', text: 'For special production, such as non-standard formats or materials, Hyde Media may require payment for production before it starts.' },
            { n: '4.3', text: 'When the payment period expires, the Advertiser is in default without further reminder and owes default interest of 5% per year (Art. 104 of the Swiss Code of Obligations, OR).' },
            { n: '4.4', text: 'If an overdue payment has not been received, Hyde Media may postpone or suspend the campaign until payment is made. The campaign period is not extended as a result.' },
            { n: '4.5', text: 'Hyde Media may withdraw from a confirmed order if the Advertiser’s creditworthiness cannot be confirmed or the Advertiser has overdue unpaid invoices with Hyde Media.' },
          ] },
        ],
      },
      {
        id: 'cancellation',
        heading: '5. Moving and cancelling orders',
        blocks: [
          { clauses: [
            { n: '5.1', text: 'A confirmed order is binding on the Advertiser.' },
            { n: '5.2', text: `The Advertiser may request to move the campaign to another period once, no later than ${P.moveWeeksBefore} weeks before the agreed start. Moving requires the placement to be available in the requested period. Costs already incurred or committed are invoiced.` },
            { n: '5.3', text: `If the Advertiser cancels a confirmed order, costs already incurred or committed for production and permits are invoiced, together with the following share of the media price: more than ${P.cancel.earlyWeeks} weeks before start: ${P.cancel.early}%; ${P.cancel.lateWeeks}–${P.cancel.earlyWeeks} weeks before: ${P.cancel.middle}%; less than ${P.cancel.lateWeeks} weeks before: ${P.cancel.late}%.` },
            { n: '5.4', text: 'Cancellation and moving must be made in writing and take effect when Hyde Media receives the notice.' },
          ] },
        ],
      },
      {
        id: 'material',
        heading: '6. Material and content',
        blocks: [
          { clauses: [
            { n: '6.1', text: `The Advertiser supplies print-ready material in line with Hyde Media’s technical specifications. Unless otherwise agreed, material must reach Hyde Media no later than ${P.materialBusinessDays} business days before the campaign starts.` },
            { n: '6.2', text: 'If material is late or of unusable quality, the campaign start may be delayed. The campaign period is not extended and the price is not reduced as a result.' },
            { n: '6.3', text: 'Hyde Media is not liable for errors in material or proofs approved by the Advertiser, or for minor colour deviations normal in large-format printing.' },
            { n: '6.4', text: 'The Advertiser is responsible for ensuring the advertisement complies with applicable law, in particular the Swiss Federal Act against Unfair Competition (UWG) and rules on specific products, and that it holds the necessary rights to text, images, trademarks and persons shown.' },
            { n: '6.5', text: 'The Advertiser indemnifies Hyde Media and the property owner against third-party claims arising from the content of the advertisement.' },
          ] },
        ],
      },
      {
        id: 'refusal',
        heading: '7. Hyde Media’s right to refuse content',
        blocks: [
          { clauses: [
            { n: '7.1', text: 'Hyde Media may refuse, or require changes to, material that in Hyde Media’s assessment breaches the law, the conditions of a permit, the property owner’s guidelines or the principles of fair commercial communication, or that may harm the reputation of Hyde Media or the property owner.' },
            { n: '7.2', text: 'If material is refused, the Advertiser may supply new material within the agreed deadlines. If the campaign cannot run because the Advertiser does not supply acceptable material, the order is invoiced in full.' },
          ] },
        ],
      },
      {
        id: 'permits',
        heading: '8. Permits',
        blocks: [
          { clauses: [
            { n: '8.1', text: 'Hyde Media applies to the competent authority for the advertising permit (Reklamebewilligung) where one is required, and obtains the property owner’s consent.' },
            { n: '8.2', text: 'Permits may come with conditions and may exclude certain content, for example advertising for alcoholic beverages, political advertising or pornographic content. Hyde Media informs the Advertiser of the conditions known to it. Clause 7.2 applies to material that does not meet them.' },
            { n: '8.3', text: 'If a necessary permit is not granted, or is revoked or changed, for reasons outside Hyde Media’s control, Hyde Media offers an equivalent placement or period. If the Advertiser declines, Hyde Media refunds the amount paid for the part of the campaign not delivered. Hyde Media has no further liability.' },
          ] },
        ],
      },
      {
        id: 'delivery',
        heading: '9. Delivery, installation and maintenance',
        blocks: [
          { clauses: [
            { n: '9.1', text: 'Hyde Media handles installation and removal unless otherwise agreed. Installation may be delayed by weather, such as strong wind, or by access conditions on the construction site or at the property.' },
            { n: '9.2', text: 'Scaffolding placements depend on construction projects; their availability follows the construction schedule. If construction is moved or shortened, or the scaffolding is taken down earlier than planned, the campaign period may be moved or shortened accordingly. Hyde Media gives notice as soon as possible and offers an alternative period or placement. If the Advertiser declines, the price is reduced proportionately for the part of the period not delivered.' },
            { n: '9.3', text: `If an advertisement is damaged, for example by vandalism or storm, Hyde Media repairs it within a reasonable time. If the advertisement is not visible for more than ${P.outageDaysBeforeCompensation} consecutive days for reasons Hyde Media is responsible for, the period is extended accordingly or the price reduced proportionately.` },
            { n: '9.4', text: 'Hyde Media documents the installation with photos.' },
          ] },
        ],
      },
      {
        id: 'complaints',
        heading: '10. Complaints',
        blocks: [
          { clauses: [
            { n: '10.1', text: `The Advertiser must notify defects in writing immediately, and at the latest within ${P.complaintWorkingDays} working days, after discovering, or when it ought to have discovered, the defect (Art. 201 CO).` },
            { n: '10.2', text: `Claims for defects must in any event be made no later than ${P.absoluteComplaintMonths} months after the campaign ends.` },
            { n: '10.3', text: 'A complaint does not entitle the Advertiser to withhold payment for parts of the order not covered by it.' },
            { n: '10.4', text: 'For a justified complaint, Hyde Media may choose to remedy the defect, extend the campaign, deliver an equivalent service or give a proportionate price reduction.' },
          ] },
        ],
      },
      {
        id: 'liability',
        heading: '11. Liability and limitation of liability',
        blocks: [
          { clauses: [
            { n: '11.1', text: 'Hyde Media is liable under the general provisions of the Swiss Code of Obligations (OR), subject to the limitations in these terms.' },
            { n: '11.2', text: 'To the extent permitted by law, Hyde Media is not liable for indirect or consequential losses such as business interruption, loss of profit, lost turnover or loss of reputation.' },
            { n: '11.3', text: 'To the extent permitted by law, Hyde Media’s total liability is limited to the agreed price of the order the claim relates to.' },
            { n: '11.4', text: 'These limitations do not apply to damage caused by Hyde Media intentionally or through gross negligence (Art. 100(1) OR), nor where further liability is mandatory by law.' },
          ] },
        ],
      },
      {
        id: 'force-majeure',
        heading: '12. Force majeure',
        blocks: [
          { clauses: [
            { n: '12.1', text: 'Hyde Media is not liable for non-performance or delay caused by circumstances beyond its control, including unusual weather, fire, strikes, epidemics, decisions by public authorities, stoppages or changes in construction projects, and delays at suppliers for the same reasons.' },
            { n: '12.2', text: `During force majeure, the affected obligations are suspended for as long as the circumstance lasts. If it lasts more than ${P.forceMajeureDays} days, either party may withdraw from the affected part of the order without liability. Amounts paid for services not delivered are refunded.` },
          ] },
        ],
      },
      {
        id: 'reference',
        heading: '13. Use of the campaign as a reference',
        blocks: [
          { clauses: [
            { n: '13.1', text: 'Hyde Media may photograph and film the campaign and use the images, together with the Advertiser’s name and logo, as a reference on its website, in presentations and on social media.' },
            { n: '13.2', text: 'If the Advertiser does not want the campaign used as a reference, Hyde Media must be notified in writing no later than the campaign start.' },
          ] },
        ],
      },
      {
        id: 'agencies',
        heading: '14. Media agencies and subcontractors',
        blocks: [
          { clauses: [
            { n: '14.1', text: 'Any agency commission or discount is agreed separately and applies to media rental only — not to production, installation, fees or other costs.' },
            { n: '14.2', text: 'Hyde Media may have all or part of the work carried out by subcontractors, such as printers and installers. Hyde Media is responsible for their work as for its own.' },
          ] },
        ],
      },
      {
        id: 'personal-data',
        heading: '15. Data protection',
        blocks: [
          { p: 'Hyde Media processes personal data about the Advertiser’s contact persons to perform and administer the agreement, in accordance with the revised Swiss Federal Act on Data Protection (revDSG). Read more in our [privacy policy](/en/privacy).' },
        ],
      },
      {
        id: 'governing-law',
        heading: '16. Governing law and jurisdiction',
        blocks: [
          { clauses: [
            { n: '16.1', text: 'The agreement is governed by Swiss law, in particular the Swiss Code of Obligations. The United Nations Convention on Contracts for the International Sale of Goods (Vienna Convention, CISG) is excluded.' },
            { n: '16.2', text: 'The parties shall first try to resolve any dispute amicably.' },
            { n: '16.3', text: 'The exclusive place of jurisdiction is Basel (Canton of Basel-Stadt), Switzerland.' },
          ] },
        ],
      },
      {
        id: 'changes',
        heading: '17. Changes',
        blocks: [
          { p: 'Hyde Media may amend these terms. Changes apply to orders confirmed after publication and do not affect orders already confirmed.' },
        ],
      },
      {
        id: 'contact',
        heading: '18. Contact',
        blocks: [
          { ul: [
            `**${companyName()}**`,
            ...(C.uid ? [`Swiss company ID (UID): ${C.uid}`] : []),
            `${C.street}, ${C.postal}, Switzerland`,
            `Email: [${C.email}](mailto:${C.email})`,
            `Phone: ${C.phone}`,
          ] },
        ],
      },
    ],
  },
};
