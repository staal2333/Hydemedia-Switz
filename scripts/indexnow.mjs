// Tells Bing (and through it ChatGPT search), Yandex, Seznam and Naver which
// pages exist, via IndexNow. Needs no account: the key file in /public proves
// ownership. Run after a deploy that adds or changes pages:
//   node scripts/indexnow.mjs
const KEY = '2384f92ab5d75ebefd41e234dfe716c5';
const HOST = 'www.hydemedia.ch';

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
