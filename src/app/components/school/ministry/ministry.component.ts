import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.scss']
})
export class MinistryComponent implements OnInit {

  logoPath = 'assets/images/ministry-logo.jpg';
  companyLogoPath = 'assets/images/logo.png';
  companyNameKey = 'Banner.name';

  sections: any[] = [];
  visionChain: string[] = [];
  visionPillars: string[] = [];

  // App screenshots shown under each section, keyed by section id (language-independent).
  readonly screenshots: { [sectionId: string]: { src: string, alt: string }[] } = {
    'identity': [
      { src: 'assets/images/schoolAppScreenshots/userProfile.jpg', alt: 'User Profile' }
    ],
    'permissions': [
      { src: 'assets/images/schoolAppScreenshots/settings.jpg', alt: 'Admin Settings' }
    ],
    'social': [
      { src: 'assets/images/schoolAppScreenshots/posts.jpg', alt: 'Posts' },
      { src: 'assets/images/schoolAppScreenshots/reels.jpg', alt: 'Reels' },
      { src: 'assets/images/schoolAppScreenshots/comments.jpg', alt: 'Comments' },
      { src: 'assets/images/schoolAppScreenshots/socialMediaAudianceType.jpg', alt: 'Content Targeting' }
    ],
    'branding': [
      { src: 'assets/images/schoolAppScreenshots/homePage.jpg', alt: 'App Home Page' },
      { src: 'assets/images/schoolAppScreenshots/languages.jpg', alt: 'Multi-language Support' }
    ],
    'ai': [
      { src: 'assets/images/schoolAppScreenshots/sawaedAI.jpg', alt: 'Sawaed AI Assistant' }
    ],
    'transportation': [
      { src: 'assets/images/schoolAppScreenshots/busManagement.jpg', alt: 'Bus Management' },
      { src: 'assets/images/schoolAppScreenshots/busTrachking.jpg', alt: 'Bus Tracking' }
    ],
    'attendance': [
      { src: 'assets/images/schoolAppScreenshots/notifications.jpg', alt: 'Notifications' }
    ],
    'assignments': [
      { src: 'assets/images/schoolAppScreenshots/courseManagment.jpg', alt: 'Course Management' }
    ],
    'calendar': [
      { src: 'assets/images/schoolAppScreenshots/calendar.jpg', alt: 'School Calendar' }
    ],
    'fees': [
      { src: 'assets/images/schoolAppScreenshots/paymentsLatencyManagment.jpg', alt: 'Payments Management' }
    ],
    'feature-flags': [
      { src: 'assets/images/schoolAppScreenshots/featureFlag.jpg', alt: 'Feature Flag Controls' }
    ]
  };

  isScreenshotModalOpen = false;
  selectedScreenshotSrc: string | null = null;
  selectedScreenshotAlt: string = '';

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageService.switchLang('ar');

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.loadData();
    this.translateService.onLangChange.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.translateService.get('Ministry.Sections').subscribe((data: any[]) => {
      this.sections = Array.isArray(data) ? data : [];
    });
    this.translateService.get('Ministry.Vision.Chain').subscribe((data: string[]) => {
      this.visionChain = Array.isArray(data) ? data : [];
    });
    this.translateService.get('Ministry.Vision.Pillars').subscribe((data: string[]) => {
      this.visionPillars = Array.isArray(data) ? data : [];
    });
  }

  sectionNumber(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  scroll(el: string): void {
    const element = document.getElementById(el);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openScreenshotModal(src: string, alt: string): void {
    this.selectedScreenshotSrc = src;
    this.selectedScreenshotAlt = alt;
    this.isScreenshotModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeScreenshotModal(): void {
    this.isScreenshotModalOpen = false;
    this.selectedScreenshotSrc = null;
    this.selectedScreenshotAlt = '';
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isScreenshotModalOpen) {
      this.closeScreenshotModal();
    }
  }

  isRtl(): boolean {
    return this.translateService.currentLang === 'ar' || this.translateService.getDefaultLang() === 'ar';
  }
}
