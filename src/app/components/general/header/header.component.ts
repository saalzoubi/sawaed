import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('animateMenu', [
      transition(':enter', [
        query('*', [
          style({opacity: 0, transform: 'translateY(-50%)'}),
          stagger(50, [
            animate(
              '250ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({opacity: 1, transform: 'none'}))
          ])
        ])
      ])
    ])
  ]
})



export class HeaderComponent implements OnInit {

  responsiveMenuVisible = false;
  pageYPosition: number;
  languageFormControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    private router: Router,
    public languageService: LanguageService,
    private analytics: AnalyticsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.languageFormControl.setValue(this.languageService.language || 'en');
    this.translateService.onLangChange.subscribe((event) => {
      if (this.languageFormControl.value !== event.lang) {
        this.languageFormControl.setValue(event.lang, { emitEvent: false });
      }
    });
  }
  // tslint:disable-next-line:typedef
  scroll(el) {
    this.analytics.trackNavClick(el);
    if (document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigateByUrl(this.languageService.homeUrl()).then(() => document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible = false;
  }
  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event): void {
        this.pageYPosition = window.pageYOffset;
    }

    changeLanguage(language: string): void {
      this.languageService.changeLanguage(language);

    }

    toggleLanguage(): void {
      const newLang = this.languageFormControl.value === 'en' ? 'ar' : 'en';
      this.changeLanguage(newLang);
    }


}
