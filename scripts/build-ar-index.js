// Writes a static index.html for every page/language in src/app/services/language/seo.json
// (other than the English home, which is index.html itself), e.g. dist/.../ar/index.html.
// GitHub Pages serves those with a 200 and the right <head>, so Google indexes each page in
// each language, including https://sawaedelm.com/ar/ with an Arabic title.
// Run after `ng build` (npm run build-portfolio does both).
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist', 'sawaed-website');
const pages = require('../src/app/services/language/seo.json');
const SITE_URL = 'https://sawaedelm.com';
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escape = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const urlFor = (pagePath, lang) => {
  const dir = pagePath === '/' ? '/' : pagePath + '/';
  return SITE_URL + (lang === 'ar' ? '/ar' + dir : dir);
};

function render(pagePath, lang, seo) {
  let html = template;
  const swap = (pattern, value) => {
    if (!pattern.test(html)) {
      throw new Error(`build-ar-index: ${pattern} not found in index.html`);
    }
    html = html.replace(pattern, (m, before, old, after) => before + value + after);
  };
  const title = escape(seo.title);
  const description = escape(seo.description);
  swap(/(<html lang=")(en)(")/, lang);
  if (lang === 'ar') {
    html = html.replace('<html lang="ar"', '<html lang="ar" dir="rtl"');
    swap(/(<noscript>)([^<]*)(<\/noscript>)/, 'يرجى تفعيل JavaScript لاستخدام هذا الموقع.');
  }
  swap(/(<title>)([^<]*)(<\/title>)/, title);
  swap(/(<meta name="description" content=")([^"]*)(")/, description);
  swap(/(<meta property="og:title" content=")([^"]*)(")/, title);
  swap(/(<meta property="og:description" content=")([^"]*)(")/, description);
  swap(/(<meta name="twitter:title" content=")([^"]*)(")/, title);
  swap(/(<meta name="twitter:description" content=")([^"]*)(")/, description);
  swap(/(<meta property="og:locale" content=")([^"]*)(")/, seo.locale);
  swap(/(<meta property="og:url" content=")([^"]*)(")/, urlFor(pagePath, lang));
  swap(/(<link rel="canonical" href=")([^"]*)(")/, urlFor(pagePath, lang));
  swap(/(<link rel="alternate" hreflang="en" href=")([^"]*)(")/, urlFor(pagePath, 'en'));
  swap(/(<link rel="alternate" hreflang="ar" href=")([^"]*)(")/, urlFor(pagePath, 'ar'));
  swap(/(<link rel="alternate" hreflang="x-default" href=")([^"]*)(")/, urlFor(pagePath, 'en'));
  return html;
}

for (const key of Object.keys(pages)) {
  const page = pages[key];
  for (const lang of ['en', 'ar']) {
    const html = render(page.path, lang, page[lang]);
    const dir = path.join(dist, lang === 'ar' ? 'ar' : '', page.path);
    if (key === 'home' && lang === 'en') {
      if (html !== template) {
        throw new Error('build-ar-index: src/index.html head is out of sync with seo.json "home.en"');
      }
      continue;
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('build-ar-index: wrote', path.relative(dist, path.join(dir, 'index.html')));
  }
}
