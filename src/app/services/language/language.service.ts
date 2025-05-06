import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: string;
  textDirection: string;

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {}

  initLanguage(){
    this.translateService.addLangs(['en', 'ar']);
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    this.language = browserLang;
    /*this.translateService.setDefaultLang(language);

    // Change the URL without navigate:
    this.location.go(language);

    this.language = language;
    this.textDirection = this.language === 'es' ? 'RTL' : 'LTR';
    document.documentElement.dir = this.textDirection;
    document.documentElement.setAttribute('dir', this.textDirection);*/
  }

  /*changeLanguage(language: string) {
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language = language;

    // Set the text direction based on language
    this.textDirection = this.language === 'ar' ? 'rtl' : 'ltr';

    // Apply the correct direction to the document
    document.documentElement.setAttribute('dir', this.textDirection);
  }*/

  switchLang(lang: string) {
    const supportedLangs = this.translateService.getLangs();
    console.log('Supported languages:', supportedLangs);
    if (!supportedLangs.includes(lang)) {
      console.warn(`Language '${lang}' is not supported. Falling back to 'en'.`);
      lang = 'en';
    }
    this.translateService.use(lang);
    this.location.go(lang);
    this.language = lang;
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

}
