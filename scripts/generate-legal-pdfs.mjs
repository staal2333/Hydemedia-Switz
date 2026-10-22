// Regenerates the downloadable terms PDFs from the live pages.
// Run after editing content/legal/terms.ts:
//   npm run build && npm run start   (in another terminal)
//   node scripts/generate-legal-pdfs.mjs
// Uses Playwright's Chromium; set BASE to point at another server.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const DOCS = [
  ['de/terms', 'public/docs/hyde-media-agb.pdf'],
  ['en/terms', 'public/docs/hyde-media-terms-of-sale.pdf'],
];

mkdirSync('public/docs', { recursive: true });
const browser = await chromium.launch();
for (const [path, out] of DOCS) {
  const page = await browser.newPage();
  await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: out, format: 'A4', printBackground: false, margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' } });
  console.log('wrote', out);
  await page.close();
}
await browser.close();
