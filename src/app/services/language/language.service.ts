import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import seoPages from './seo.json';

const SITE_URL = 'https://sawaedelm.com';
const PREF_KEY = 'sawaed.lang';

// Head tags per page and language, keyed by route data.seo. scripts/build-ar-index.js reads
// the same file to write each page's static index.html (which GitHub Pages serves at the
// trailing-slash URL, so that is those pages' canonical form). Arabic search results come
// from the /ar URLs, so the Arabic text must contain the Arabic name people actually type.
const SEO: { [page: string]: any } = seoPages;
const STATIC_PAGES = Object.keys(SEO).map(k => SEO[k].path);

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: string;
  textDirection: string;

  constructor(
    public translateService: TranslateService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  // The language comes from the URL (/ar/... is Arabic, everything else English) so every
  // visitor, including Googlebot, gets the same language for the same URL.
  initLanguage() {
    this.translateService.addLangs(['en', 'ar']);

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      const url = e.urlAfterRedirects;
      const path = this.stripLang(url);
      const data = this.routeData();
      if (this.shouldRedirectToArabic(url, data)) {
        this.router.navigateByUrl(this.urlFor(path, 'ar'), { replaceUrl: true });
        return;
      }
      const lang = data.lang || (this.isArabicUrl(url) ? 'ar' : 'en');
      this.switchLang(lang);
      this.updateSeoTags(lang, path, data);
    });
  }

  // English URL, but this visitor should see Arabic: they chose Arabic before, or (with no
  // choice saved) the page defaults to Arabic or their browser is Arabic. Crawlers are never
  // redirected, so the English URLs stay indexable.
  private shouldRedirectToArabic(url: string, data: any): boolean {
    if (this.isArabicUrl(url) || data.lang || this.isCrawler()) {
      return false;
    }
    return (this.savedLang() || data.defaultLang || this.browserLang()) === 'ar';
  }

  switchLang(lang: string) {
    if (!this.translateService.getLangs().includes(lang)) {
      lang = 'en';
    }
    this.translateService.use(lang);
    this.language = lang;
    this.textDirection = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.lang = lang;
    this.document.dir = this.textDirection;
  }

  // User-initiated language change: remember it and move to that language's URL.
  changeLanguage(lang: string) {
    try { localStorage.setItem(PREF_KEY, lang); } catch (e) {}
    this.router.navigateByUrl(this.urlFor(this.stripLang(this.router.url), lang));
  }

  // Home URL for the current language, for "back to home" links.
  homeUrl(): string {
    return this.localize('/');
  }

  // An app path ('/product/school') in the current language.
  localize(path: string): string {
    return this.urlFor(path, this.language);
  }

  private updateSeoTags(lang: string, path: string, data: any) {
    const page = SEO[data.seo] || SEO.home;
    const seo = page[lang] || page.en;
    // Single-language pages have no translation to point to and live at their plain URL.
    const url = data.lang ? this.absoluteUrl(path, 'en') : this.absoluteUrl(path, lang);
    this.titleService.setTitle(seo.title);
    this.metaService.updateTag({ name: 'description', content: seo.description });
    this.metaService.updateTag({ property: 'og:title', content: seo.title });
    this.metaService.updateTag({ property: 'og:description', content: seo.description });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:locale', content: seo.locale });
    this.metaService.updateTag({ name: 'twitter:title', content: seo.title });
    this.metaService.updateTag({ name: 'twitter:description', content: seo.description });
    this.setLink('canonical', null, url);
    this.setLink('alternate', 'en', data.lang ? null : this.absoluteUrl(path, 'en'));
    this.setLink('alternate', 'ar', data.lang ? null : this.absoluteUrl(path, 'ar'));
    this.setLink('alternate', 'x-default', data.lang ? null : this.absoluteUrl(path, 'en'));
  }

  // href null removes the link.
  private setLink(rel: string, hreflang: string | null, href: string | null) {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector(selector) as HTMLLinkElement;
    if (!href) {
      if (link) { link.remove(); }
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) { link.hreflang = hreflang; }
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private savedLang(): string | null {
    try {
      return localStorage.getItem(PREF_KEY);
    } catch (e) {
      return null;
    }
  }

  private browserLang(): string {
    return this.translateService.getBrowserLang() === 'ar' ? 'ar' : 'en';
  }

  private isCrawler(): boolean {
    return /bot|crawl|spider|slurp|facebookexternalhit|lighthouse/i.test(navigator.userAgent);
  }

  // Data of the deepest active route: lang, defaultLang, seo (see app-routing.module.ts).
  private routeData(): any {
    let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    while (route.firstChild) { route = route.firstChild; }
    return route.data || {};
  }

  private isArabicUrl(url: string): boolean {
    return /^\/ar(\/|\?|#|$)/.test(url);
  }

  // '/ar/product/school/assf' -> '/product/school/assf'; '/ar' -> '/'
  private stripLang(url: string): string {
    return this.isArabicUrl(url) ? (url.substring(3) || '/').replace(/^([?#])/, '/$1') : url;
  }

  private urlFor(path: string, lang: string): string {
    if (lang !== 'ar') { return path; }
    return path === '/' ? '/ar' : '/ar' + path;
  }

  private absoluteUrl(path: string, lang: string): string {
    let clean = path.split(/[?#]/)[0].toLowerCase();
    if (STATIC_PAGES.includes(clean) && clean !== '/') {
      clean += '/';
    }
    if (lang === 'ar') {
      return SITE_URL + (clean === '/' ? '/ar/' : '/ar' + clean);
    }
    return SITE_URL + clean;
  }

}
