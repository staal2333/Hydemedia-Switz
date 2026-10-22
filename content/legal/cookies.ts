import { COMPANY, companyName, type LegalDocs } from './types';

const C = COMPANY;

export const cookies: LegalDocs = {
  de: {
    eyebrow: 'Cookies',
    title: 'Cookie-Richtlinie',
    updated: 'Gültig ab 1. November 2026',
    tocLabel: 'Inhalt',
    intro:
      'Wir verwenden so wenige Cookies wie möglich. Die Website funktioniert ohne Statistik-Cookies, und wir setzen sie erst, wenn Sie ausdrücklich zugestimmt haben.',
    sections: [
      {
        id: 'was-sind-cookies',
        heading: '1. Was sind Cookies',
        blocks: [
          { p: 'Ein Cookie ist eine kleine Textdatei, die beim Besuch einer Website auf Ihrem Computer, Smartphone oder Tablet gespeichert wird. Ähnliche Technologien wie der lokale Speicher Ihres Browsers (localStorage) funktionieren vergleichbar. In dieser Richtlinie bezeichnen wir sie alle als Cookies.' },
        ],
      },
      {
        id: 'einwilligung',
        heading: '2. So holen wir Ihre Einwilligung ein',
        blocks: [
          { p: 'Beim ersten Besuch fragen wir Sie, ob Sie Statistik-Cookies zulassen möchten. Bis Sie entschieden haben, verwenden wir nur die notwendigen Einträge, ohne die die Website nicht funktioniert. Ablehnen ist genauso einfach wie Zustimmen.' },
          { p: 'Ihre Wahl gilt während 12 Monaten. Danach fragen wir Sie erneut.' },
        ],
      },
      {
        id: 'uebersicht',
        heading: '3. Übersicht',
        blocks: [
          {
            table: {
              head: ['Name', 'Anbieter', 'Zweck', 'Kategorie', 'Speicherdauer'],
              rows: [
                ['hyde-consent', 'Hyde Media', 'Speichert Ihre Cookie-Wahl, damit wir sie respektieren und nicht bei jedem Besuch erneut fragen. Lokaler Speicher des Browsers.', 'Notwendig', '12 Monate, danach wird erneut gefragt'],
                ['hyde-newsletter', 'Hyde Media', 'Merkt sich, dass Sie die Newsletter-Einblendung geschlossen oder sich angemeldet haben, damit sie nicht erneut erscheint. Lokaler Speicher des Browsers.', 'Notwendig (funktional)', '30 Tage nach dem Schliessen; nach einer Anmeldung bis zur Löschung im Browser'],
                ['_ga', 'Google', 'Unterscheidet Besucher, damit Google Analytics einzelne Besuche zählen kann.', 'Statistik', 'bis zu 2 Jahre'],
                ['_ga_<ID>', 'Google', 'Speichert den Stand der aktuellen Sitzung in Google Analytics.', 'Statistik', 'bis zu 2 Jahre'],
              ],
            },
          },
          { p: 'Statistik-Cookies werden nur gesetzt, wenn Sie eingewilligt haben. Google kann Daten in den USA bearbeiten – mehr dazu in unserer [Datenschutzerklärung](/de/privacy).' },
        ],
      },
      {
        id: 'statistik-ohne-cookies',
        heading: '4. Statistik ohne Cookies',
        blocks: [
          { p: 'Wir verwenden Vercel Web Analytics und Vercel Speed Insights, um Besucherzahlen und Ladezeiten in zusammengefasster Form zu messen. Diese Dienste setzen keine Cookies und speichern nichts auf Ihrem Gerät. Die Daten sind aggregiert und lassen keine Rückschlüsse auf Ihre Person zu.' },
        ],
      },
      {
        id: 'wahl-aendern',
        heading: '5. So ändern Sie Ihre Wahl',
        blocks: [
          { p: 'Sie können Ihre Einwilligung jederzeit ändern oder widerrufen. Verwenden Sie dazu die Schaltfläche unten oder den Link «Cookie-Einstellungen» unten auf jeder Seite. Wenn Sie Ihre Einwilligung widerrufen, löschen wir die bereits gesetzten Statistik-Cookies.' },
          { consentButton: 'Cookie-Einstellungen öffnen' },
          { p: 'Sie können Cookies und gespeicherte Website-Daten auch in Ihrem Browser löschen. Anleitungen finden Sie für [Google Chrome](https://support.google.com/chrome/answer/95647), [Safari](https://support.apple.com/de-ch/guide/safari/sfri11471/mac), [Firefox](https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen) und [Microsoft Edge](https://support.microsoft.com/de-ch/microsoft-edge).' },
        ],
      },
      {
        id: 'drittanbieter',
        heading: '6. Drittanbieter',
        blocks: [
          { p: 'Abgesehen von Google Analytics – und nur mit Ihrer Einwilligung – lädt die Website keine Inhalte von Drittanbietern, die Cookies setzen können. Schriften und der Decoder für das 3D-Modell liegen auf unserem eigenen Server, und es sind keine sozialen Medien oder Videodienste eingebettet.' },
        ],
      },
      {
        id: 'kontakt',
        heading: '7. Kontakt',
        blocks: [
          { p: `Fragen zu unserer Verwendung von Cookies? Schreiben Sie an [${C.email}](mailto:${C.email}). Die Website wird betrieben von ${companyName()}, ${C.street}, ${C.postal}, ${C.country}${C.uid ? ` (UID: ${C.uid})` : ''}.` },
        ],
      },
    ],
  },

  en: {
    eyebrow: 'Cookies',
    title: 'Cookie policy',
    updated: 'Effective from 1 November 2026',
    tocLabel: 'Contents',
    intro:
      'We keep cookies to a minimum. The website works without statistics cookies, and we only set them once you have actively agreed.',
    sections: [
      {
        id: 'what-are-cookies',
        heading: '1. What cookies are',
        blocks: [
          { p: 'A cookie is a small text file stored on your computer, phone or tablet when you visit a website. Similar technologies, such as your browser’s local storage (localStorage), work in a comparable way. In this policy we call them all cookies.' },
        ],
      },
      {
        id: 'consent',
        heading: '2. How we ask for consent',
        blocks: [
          { p: 'On your first visit we ask whether you want to allow statistics cookies. Until you choose, we only use the necessary entries the website cannot work without. Rejecting is as easy as accepting.' },
          { p: 'Your choice is kept for 12 months. After that we ask again.' },
        ],
      },
      {
        id: 'overview',
        heading: '3. Overview',
        blocks: [
          {
            table: {
              head: ['Name', 'Provider', 'Purpose', 'Category', 'Duration'],
              rows: [
                ['hyde-consent', 'Hyde Media', 'Stores your cookie choice so we can respect it and don’t ask on every visit. Browser local storage.', 'Necessary', '12 months, then we ask again'],
                ['hyde-newsletter', 'Hyde Media', 'Remembers that you closed the newsletter prompt or subscribed, so it is not shown again. Browser local storage.', 'Necessary (functional)', '30 days after closing; after subscribing, until deleted in the browser'],
                ['_ga', 'Google', 'Distinguishes visitors so Google Analytics can count individual visits.', 'Statistics', 'up to 2 years'],
                ['_ga_<ID>', 'Google', 'Keeps the state of the current session in Google Analytics.', 'Statistics', 'up to 2 years'],
              ],
            },
          },
          { p: 'Statistics cookies are only set if you have consented. Google may process data in the United States — read more in our [privacy policy](/en/privacy).' },
        ],
      },
      {
        id: 'cookieless-statistics',
        heading: '4. Statistics without cookies',
        blocks: [
          { p: 'We use Vercel Web Analytics and Vercel Speed Insights to measure visitor numbers and page load times in aggregated form. These services set no cookies and store nothing on your device. The data is aggregated and cannot be used to identify you.' },
        ],
      },
      {
        id: 'change-choice',
        heading: '5. How to change your choice',
        blocks: [
          { p: 'You can change or withdraw your consent at any time. Use the button below or the “Cookie settings” link at the bottom of every page. If you withdraw consent, we delete the statistics cookies already set.' },
          { consentButton: 'Open cookie settings' },
          { p: 'You can also delete cookies and stored site data in your browser. See the guides for [Google Chrome](https://support.google.com/chrome/answer/95647), [Safari](https://support.apple.com/guide/safari/sfri11471/mac), [Firefox](https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox) and [Microsoft Edge](https://support.microsoft.com/microsoft-edge).' },
        ],
      },
      {
        id: 'third-parties',
        heading: '6. Third parties',
        blocks: [
          { p: 'Apart from Google Analytics — and only with your consent — the website loads no third-party content that can set cookies. Fonts and the 3D model decoder are served from our own server, and there are no embedded social media or video services.' },
        ],
      },
      {
        id: 'contact',
        heading: '7. Contact',
        blocks: [
          { p: `Questions about our use of cookies? Email [${C.email}](mailto:${C.email}). The website is operated by ${companyName()}, ${C.street}, ${C.postal}, Switzerland${C.uid ? ` (Swiss company ID: ${C.uid})` : ''}.` },
        ],
      },
    ],
  },
};
