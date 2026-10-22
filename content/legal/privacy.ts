import { COMPANY, companyName, type LegalDocs } from './types';

const C = COMPANY;

export const privacy: LegalDocs = {
  de: {
    eyebrow: 'Datenschutz',
    title: 'Datenschutzerklärung',
    updated: 'Gültig ab 1. November 2026',
    tocLabel: 'Inhalt',
    intro:
      'In dieser Datenschutzerklärung erfahren Sie, welche Personendaten wir bearbeiten, zu welchem Zweck, wie lange wir sie aufbewahren und welche Rechte Sie haben. Sie gilt für hydemedia.ch und für unseren Kontakt mit Kunden, Geschäftspartnern und Liegenschaftseigentümern.',
    sections: [
      {
        id: 'verantwortlicher',
        heading: '1. Verantwortlicher',
        blocks: [
          { p: 'Verantwortlich für die Bearbeitung Ihrer Personendaten ist:' },
          {
            ul: [
              `**${companyName()}**`,
              ...(C.uid ? [`UID: ${C.uid}`] : []),
              `${C.street}, ${C.postal}, ${C.country}`,
              `E-Mail: [${C.email}](mailto:${C.email})`,
              `Telefon: ${C.phone}`,
            ],
          },
          { p: 'Bei Fragen zu dieser Datenschutzerklärung oder wenn Sie Ihre Rechte ausüben möchten, erreichen Sie uns unter den oben genannten Angaben.' },
        ],
      },
      {
        id: 'rechtsgrundlagen',
        heading: '2. Anwendbares Recht',
        blocks: [
          { p: 'Wir bearbeiten Personendaten nach dem revidierten Bundesgesetz über den Datenschutz (revDSG) und der zugehörigen Verordnung (DSV).' },
          { p: 'Soweit die Datenschutz-Grundverordnung der EU (DSGVO) auf eine Bearbeitung anwendbar ist, etwa weil Sie sich in der EU oder im EWR aufhalten, nennen wir zusätzlich die Rechtsgrundlage nach Art. 6 Abs. 1 DSGVO.' },
        ],
      },
      {
        id: 'bearbeitungen',
        heading: '3. Welche Daten wir bearbeiten und warum',
        blocks: [
          { p: '**Besuch der Website.** Beim Aufruf einer Seite bearbeitet unser Hosting-Anbieter technisch notwendige Daten wie IP-Adresse, Browsertyp, Zeitpunkt und die aufgerufene Seite. Zweck ist, die Website auszuliefern und sie vor Missbrauch und Angriffen zu schützen. Dazu gehört auch, dass wir die IP-Adresse kurzzeitig verwenden, um automatisierte Massenanfragen an unsere Formulare zu begrenzen.' },
          { ul: [
            'DSGVO: berechtigtes Interesse an einer sicheren und stabilen Website, Art. 6 Abs. 1 lit. f.',
            'Aufbewahrung: technische Protokolle werden nur kurz aufbewahrt und laufend gelöscht.',
          ] },
          { p: '**Statistik ohne Cookies.** Wir verwenden Vercel Web Analytics und Vercel Speed Insights, um die Besucherzahlen und die Ladezeiten der Website in zusammengefasster Form auszuwerten. Diese Dienste setzen keine Cookies, speichern nichts auf Ihrem Gerät und ermöglichen uns nicht, Sie zu identifizieren.' },
          { ul: [
            'DSGVO: berechtigtes Interesse an der Verbesserung der Website, Art. 6 Abs. 1 lit. f.',
          ] },
          { p: '**Google Analytics.** Nur wenn Sie im Cookie-Banner in Statistik-Cookies einwilligen, verwenden wir Google Analytics 4, um zu verstehen, wie die Website genutzt wird. Vorher wird Google Analytics nicht geladen. Sie können Ihre Einwilligung jederzeit über «Cookie-Einstellungen» unten auf jeder Seite widerrufen. Einzelheiten finden Sie in unserer [Cookie-Richtlinie](/de/cookies).' },
          { ul: [
            'Anbieter: Google Ireland Limited (Irland) und Google LLC (USA).',
            'DSGVO: Ihre Einwilligung, Art. 6 Abs. 1 lit. a. Der Widerruf berührt die Rechtmässigkeit der bis dahin erfolgten Bearbeitung nicht.',
          ] },
          { p: '**Kontaktformular und Anfragen.** Wenn Sie uns über das Kontaktformular schreiben, bearbeiten wir Ihren Namen, Ihre E-Mail-Adresse, Ihr Unternehmen, Ihre Telefonnummer, Ihre Nachricht und – falls angegeben – das gewählte Thema sowie, je nach Formular, Angaben zur geplanten Kampagne oder zur Liegenschaft. Die Angaben werden per E-Mail (SMTP) an Hyde Media übermittelt, und Sie erhalten eine Eingangsbestätigung an die angegebene E-Mail-Adresse. Dasselbe gilt sinngemäss, wenn Sie uns direkt per E-Mail oder Telefon kontaktieren. Zweck ist, Ihre Anfrage zu beantworten und Ihnen gegebenenfalls eine Offerte zu unterbreiten.' },
          { ul: [
            'DSGVO: vorvertragliche Massnahmen, Art. 6 Abs. 1 lit. b, und berechtigtes Interesse an der Beantwortung von Anfragen, Art. 6 Abs. 1 lit. f.',
            'Aufbewahrung: so lange, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist. Soweit Unterlagen zu den Geschäftsbüchern oder Buchungsbelegen gehören, etwa Offerten, Aufträge und Rechnungen, bewahren wir sie während der gesetzlichen Frist von 10 Jahren auf (Art. 958f OR).',
          ] },
          { p: '**Newsletter.** Wenn Sie sich für unseren Newsletter anmelden, bearbeiten wir Ihre E-Mail-Adresse, die Stelle auf der Website, an der Sie sich angemeldet haben, Ihre Sprache und Ihre IP-Adresse zum Zeitpunkt der Anmeldung. Der Versand erfolgt über Mailchimp (Intuit Inc., USA) im Double-Opt-in-Verfahren: Sie erhalten den Newsletter erst, nachdem Sie die Anmeldung über den Link in der Bestätigungs-E-Mail bestätigt haben. Ist Mailchimp nicht eingerichtet, wird Ihre Anmeldung per E-Mail an Hyde Media übermittelt. Sie können sich jederzeit über den Link in jedem Newsletter oder mit einer Nachricht an uns abmelden.' },
          { ul: [
            'Rechtsgrundlage: Ihre Einwilligung; DSGVO: Art. 6 Abs. 1 lit. a.',
            'Aufbewahrung: bis zu Ihrer Abmeldung.',
          ] },
          { p: '**Kunden und Geschäftspartner.** Wenn aus einer Anfrage ein Auftrag oder eine Zusammenarbeit entsteht, bearbeiten wir die Kontaktangaben der zuständigen Personen sowie Angaben zum Vertrag, zur Rechnungsstellung und zur Zahlung, um den Vertrag durchzuführen und unsere gesetzlichen Pflichten zu erfüllen.' },
          { ul: [
            'DSGVO: Vertragserfüllung, Art. 6 Abs. 1 lit. b, und rechtliche Verpflichtung, Art. 6 Abs. 1 lit. c.',
            'Aufbewahrung: für die Dauer des Vertrags; Geschäftsbücher und Buchungsbelege während 10 Jahren (Art. 958f OR).',
          ] },
        ],
      },
      {
        id: 'technik',
        heading: '4. Schriften und technische Komponenten',
        blocks: [
          { p: 'Die Schriften der Website liegen auf unserem eigenen Server; beim Aufruf der Website werden keine Anfragen an Google Fonts gesendet. Auch der Decoder für das 3D-Modell auf der Startseite wird von unserem eigenen Server geladen.' },
        ],
      },
      {
        id: 'empfaenger',
        heading: '5. Empfänger und Auftragsbearbeiter',
        blocks: [
          { p: 'Wir verkaufen keine Personendaten. Wir setzen folgende Anbieter ein, die Daten in unserem Auftrag bearbeiten:' },
          { ul: [
            '**Vercel Inc.** (USA) – Hosting der Website und cookiefreie Statistik (Vercel Web Analytics, Speed Insights). Die Serverfunktionen der Website, etwa für das Kontaktformular und die Newsletter-Anmeldung, laufen in Frankfurt (EU).',
            '**Google Ireland Limited / Google LLC** – Google Analytics, nur mit Ihrer Einwilligung.',
            '**Intuit Inc. (Mailchimp)** (USA) – Versand des Newsletters und Verwaltung der Anmeldungen.',
          ] },
          { p: 'Darüber hinaus können Daten an Berater wie Treuhänder oder Anwälte weitergegeben werden, soweit dies erforderlich ist, sowie an Behörden, soweit wir gesetzlich dazu verpflichtet sind.' },
        ],
      },
      {
        id: 'ausland',
        heading: '6. Bekanntgabe ins Ausland',
        blocks: [
          { p: 'Vercel, Google und Intuit (Mailchimp) können Personendaten in den USA bearbeiten. Soweit der jeweilige Anbieter unter dem Swiss-U.S. Data Privacy Framework bzw. dem EU-U.S. Data Privacy Framework zertifiziert ist, stützt sich die Bekanntgabe auf die Feststellung eines angemessenen Datenschutzes durch den Bundesrat bzw. die EU-Kommission. Andernfalls stützt sie sich auf Standardvertragsklauseln.' },
          { p: 'Die Serverfunktionen in Frankfurt befinden sich in der EU, die nach Schweizer Recht einen angemessenen Datenschutz gewährleistet.' },
        ],
      },
      {
        id: 'rechte',
        heading: '7. Ihre Rechte',
        blocks: [
          { p: 'Nach dem revDSG haben Sie insbesondere folgende Rechte:' },
          { ul: [
            'Auskunft darüber, ob und welche Personendaten wir über Sie bearbeiten',
            'Berichtigung unrichtiger Personendaten',
            'Löschung Ihrer Personendaten, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht',
            'Widerspruch gegen eine Bearbeitung',
            'Herausgabe oder Übertragung der Personendaten, die Sie uns selbst bekanntgegeben haben',
            'Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft',
          ] },
          { p: 'Soweit die DSGVO anwendbar ist, haben Sie zusätzlich das Recht auf Einschränkung der Bearbeitung und auf Datenübertragbarkeit nach der DSGVO sowie das Recht, Beschwerde bei der Datenschutzaufsichtsbehörde Ihres Aufenthaltsstaats einzulegen.' },
          { p: `Schreiben Sie uns an [${C.email}](mailto:${C.email}). Wir antworten so rasch wie möglich, in der Regel innert 30 Tagen. Zum Schutz Ihrer Daten können wir Sie bitten, sich auszuweisen. Gesetzliche Aufbewahrungspflichten können Ihre Rechte einschränken.` },
        ],
      },
      {
        id: 'aufsicht',
        heading: '8. Aufsichtsbehörde',
        blocks: [
          { p: 'Sind Sie mit unserem Umgang mit Ihren Personendaten nicht einverstanden, können Sie sich an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden. Wir schätzen es aber, wenn Sie uns zuerst die Gelegenheit geben, die Angelegenheit mit Ihnen zu klären.' },
          { ul: [
            'Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB), Feldeggweg 1, 3003 Bern',
            'Website: [edoeb.admin.ch](https://www.edoeb.admin.ch)',
          ] },
        ],
      },
      {
        id: 'automatisierte-entscheidungen',
        heading: '9. Automatisierte Einzelentscheidungen und Profiling',
        blocks: [{ p: 'Wir treffen keine Entscheidungen über Sie, die ausschliesslich auf einer automatisierten Bearbeitung beruhen, und wir betreiben kein Profiling.' }],
      },
      {
        id: 'sicherheit',
        heading: '10. Datensicherheit',
        blocks: [{ p: 'Wir schützen Ihre Personendaten mit angemessenen technischen und organisatorischen Massnahmen, unter anderem mit einer verschlüsselten Verbindung (HTTPS) und beschränkten Zugriffsrechten auf unsere Systeme.' }],
      },
      {
        id: 'aenderungen',
        heading: '11. Änderungen',
        blocks: [{ p: 'Wir passen diese Datenschutzerklärung an, wenn sich unsere Datenbearbeitungen ändern. Es gilt jeweils die hier veröffentlichte Fassung mit dem oben angegebenen Datum.' }],
      },
    ],
  },

  en: {
    eyebrow: 'Privacy',
    title: 'Privacy policy',
    updated: 'Effective from 1 November 2026',
    tocLabel: 'Contents',
    intro:
      'This policy explains which personal data we process, why, how long we keep it, and what rights you have. It covers hydemedia.ch and our contact with customers, business partners and property owners.',
    sections: [
      {
        id: 'controller',
        heading: '1. Controller',
        blocks: [
          { p: 'The controller responsible for processing your personal data is:' },
          {
            ul: [
              `**${companyName()}**`,
              ...(C.uid ? [`Swiss company ID (UID): ${C.uid}`] : []),
              `${C.street}, ${C.postal}, Switzerland`,
              `Email: [${C.email}](mailto:${C.email})`,
              `Phone: ${C.phone}`,
            ],
          },
          { p: 'If you have questions about this policy or want to exercise your rights, contact us using the details above.' },
        ],
      },
      {
        id: 'applicable-law',
        heading: '2. Applicable law',
        blocks: [
          { p: 'We process personal data in accordance with the revised Swiss Federal Act on Data Protection (revDSG) and its ordinance (DSV).' },
          { p: 'Where the EU General Data Protection Regulation (GDPR) applies to a processing activity, for example because you are in the EU or EEA, we also state the legal basis under Article 6(1) GDPR.' },
        ],
      },
      {
        id: 'processing',
        heading: '3. What we process and why',
        blocks: [
          { p: '**When you visit the website.** When a page is served, our hosting provider processes technically necessary data such as IP address, browser type, time and the page you visit. The purpose is to deliver the website and protect it against misuse and attacks. This includes briefly using the IP address to limit automated mass submissions to our forms.' },
          { ul: [
            'GDPR: our legitimate interest in a secure and stable website, Article 6(1)(f).',
            'Retention: technical logs are kept briefly and deleted on a rolling basis.',
          ] },
          { p: '**Statistics without cookies.** We use Vercel Web Analytics and Vercel Speed Insights to evaluate visitor numbers and page load times in aggregated form. These services set no cookies, store nothing on your device and do not let us identify you.' },
          { ul: [
            'GDPR: our legitimate interest in improving the website, Article 6(1)(f).',
          ] },
          { p: '**Google Analytics.** Only if you consent to statistics cookies in the cookie banner do we use Google Analytics 4 to understand how the website is used. Until then, Google Analytics is not loaded. You can withdraw your consent at any time via “Cookie settings” at the bottom of every page. See our [cookie policy](/en/cookies) for details.' },
          { ul: [
            'Provider: Google Ireland Limited (Ireland) and Google LLC (USA).',
            'GDPR: your consent, Article 6(1)(a). Withdrawal does not affect the lawfulness of processing before it.',
          ] },
          { p: '**Contact form and enquiries.** If you write to us through the contact form, we process your name, email address, company, phone number, message and — if selected — the topic, and, depending on the form, details about the planned campaign or the property. The details are sent by email (SMTP) to Hyde Media, and you receive a confirmation at the email address you gave. The same applies accordingly if you contact us directly by email or phone. The purpose is to answer your enquiry and, where relevant, send you a quote.' },
          { ul: [
            'GDPR: steps prior to entering into a contract, Article 6(1)(b), and our legitimate interest in answering enquiries, Article 6(1)(f).',
            'Retention: as long as needed to handle your enquiry. Where documents form part of our business records or accounting vouchers, such as quotes, orders and invoices, we keep them for the statutory 10 years (Art. 958f of the Swiss Code of Obligations, OR).',
          ] },
          { p: '**Newsletter.** If you sign up for our newsletter, we process your email address, where on the website you signed up, your language and your IP address at the time of signup. The newsletter is sent through Mailchimp (Intuit Inc., USA) with double opt-in: you only receive it after confirming your signup through the link in the confirmation email. If Mailchimp is not set up, your signup is sent to Hyde Media by email. You can unsubscribe at any time through the link in every newsletter or by writing to us.' },
          { ul: [
            'Legal basis: your consent; GDPR: Article 6(1)(a).',
            'Retention: until you unsubscribe.',
          ] },
          { p: '**Customers and business partners.** If an enquiry leads to an order or a partnership, we process the contact details of the people involved and information about the agreement, invoicing and payment, to perform the agreement and meet our legal obligations.' },
          { ul: [
            'GDPR: performance of a contract, Article 6(1)(b), and legal obligation, Article 6(1)(c).',
            'Retention: for the term of the agreement; business records and accounting vouchers for 10 years (Art. 958f OR).',
          ] },
        ],
      },
      {
        id: 'technical',
        heading: '4. Fonts and technical components',
        blocks: [
          { p: 'The website’s fonts are served from our own server; no requests are sent to Google Fonts when you visit the website. The decoder for the 3D model on the home page is also loaded from our own server.' },
        ],
      },
      {
        id: 'recipients',
        heading: '5. Recipients and processors',
        blocks: [
          { p: 'We never sell personal data. We use the following providers, who process data on our behalf:' },
          { ul: [
            '**Vercel Inc.** (USA) — website hosting and cookieless statistics (Vercel Web Analytics, Speed Insights). The website’s server functions, for example for the contact form and newsletter signup, run in Frankfurt (EU).',
            '**Google Ireland Limited / Google LLC** — Google Analytics, only with your consent.',
            '**Intuit Inc. (Mailchimp)** (USA) — sending the newsletter and managing signups.',
          ] },
          { p: 'Data may also be disclosed to advisers such as our fiduciary or lawyers where necessary, and to public authorities where we are legally required to.' },
        ],
      },
      {
        id: 'transfers',
        heading: '6. Transfers abroad',
        blocks: [
          { p: 'Vercel, Google and Intuit (Mailchimp) may process personal data in the United States. To the extent the provider is certified under the Swiss-U.S. Data Privacy Framework or the EU-U.S. Data Privacy Framework, the transfer relies on the finding of adequate data protection by the Swiss Federal Council or the European Commission respectively. Otherwise it relies on standard contractual clauses.' },
          { p: 'The server functions in Frankfurt are located in the EU, which provides adequate data protection under Swiss law.' },
        ],
      },
      {
        id: 'rights',
        heading: '7. Your rights',
        blocks: [
          { p: 'Under the revDSG you have, in particular, the right to:' },
          { ul: [
            'information on whether and which personal data we process about you',
            'correction of inaccurate personal data',
            'deletion of your personal data, unless a statutory retention obligation applies',
            'object to processing',
            'receive or have transferred the personal data you gave us',
            'withdraw consent with effect for the future',
          ] },
          { p: 'Where the GDPR applies, you additionally have the rights to restriction of processing and to data portability under the GDPR, and the right to lodge a complaint with the data protection authority of the country where you live.' },
          { p: `Email [${C.email}](mailto:${C.email}). We respond as quickly as possible, as a rule within 30 days. To protect your data, we may ask you to verify your identity. Statutory retention obligations may limit your rights.` },
        ],
      },
      {
        id: 'supervisory-authority',
        heading: '8. Supervisory authority',
        blocks: [
          { p: 'If you are unhappy with how we handle your personal data, you can contact the Swiss Federal Data Protection and Information Commissioner (FDPIC / EDÖB). We would appreciate the chance to resolve the matter with you first.' },
          { ul: [
            'Federal Data Protection and Information Commissioner (FDPIC), Feldeggweg 1, 3003 Bern, Switzerland',
            'Website: [edoeb.admin.ch](https://www.edoeb.admin.ch)',
          ] },
        ],
      },
      {
        id: 'automated-decisions',
        heading: '9. Automated individual decisions and profiling',
        blocks: [{ p: 'We do not make decisions about you based solely on automated processing, and we do not use profiling.' }],
      },
      {
        id: 'security',
        heading: '10. Data security',
        blocks: [{ p: 'We protect your personal data with appropriate technical and organisational measures, including encrypted connections (HTTPS) and restricted access to our systems.' }],
      },
      {
        id: 'changes',
        heading: '11. Changes',
        blocks: [{ p: 'We update this policy when our processing of personal data changes. The version published here, with the date at the top, is always the one in force.' }],
      },
    ],
  },
};
