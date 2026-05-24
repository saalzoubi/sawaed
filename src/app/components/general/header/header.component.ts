import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { UntypedFormControl } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';


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
    private analytics: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.languageFormControl.valueChanges.subscribe(val => {
      if (!val) { val = 'en'; }
      this.languageService.switchLang(val);
    });
    this.languageFormControl.setValue(this.languageService.language);
  }
  // tslint:disable-next-line:typedef
  scroll(el) {
    this.analytics.trackNavClick(el);
    if (document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigate(['/home']).then(() => document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible = false;
  }
  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event): void {
        this.pageYPosition = window.pageYOffset;
    }

    changeLanguage(language: string): void {
      console.log(language);
      this.languageFormControl.setValue(language);

    }


}
