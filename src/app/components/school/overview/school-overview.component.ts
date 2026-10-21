import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

// General (not school-specific) product page at /product/school: highlighted features only.
@Component({
  selector: 'app-school-overview',
  templateUrl: './school-overview.component.html',
  styleUrls: ['./school-overview.component.scss']
})
export class SchoolOverviewComponent implements OnInit, OnDestroy {

  readonly contactEmail = 'sawaedelm@sawaedelm.com';
  readonly heroShot = 'assets/images/schoolAppScreenshots/homePage.jpg';

  // Screenshot shown beside each spotlight, keyed by spotlight id (language-independent).
  readonly spotlightShots: { [id: string]: string } = {
    ai: 'assets/images/schoolAppScreenshots/sawaedAI.jpg',
    social: 'assets/images/schoolAppScreenshots/reels.jpg',
  };
  readonly controlShot = 'assets/images/schoolAppScreenshots/featureFlag.jpg';
  readonly gallery = [
    'homePage', 'posts', 'sawaedAI', 'busTrachking', 'calendar', 'courseManagment',
    'paymentsLatencyManagment', 'notifications', 'messages', 'userProfile',
  ].map(name => `assets/images/schoolAppScreenshots/${name}.jpg`);

  chips: string[] = [];
  personas: any[] = [];
  spotlights: any[] = [];
  features: any[] = [];
  controlPoints: string[] = [];

  selectedShot: string | null = null;

  private langSub: Subscription;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadData();
    this.langSub = this.translateService.onLangChange.subscribe(() => this.loadData());
  }

  ngOnDestroy(): void {
    // Undefined when the page is left before init (LanguageService's redirect to /ar).
    this.langSub?.unsubscribe();
    document.body.style.overflow = '';
  }

  loadData(): void {
    const keys = [
      'SchoolOverview.Hero.Chips',
      'SchoolOverview.Audience.Personas',
      'SchoolOverview.Spotlights',
      'SchoolOverview.FeatureList',
      'SchoolOverview.Control.Points',
    ];
    this.translateService.get(keys).subscribe((t: any) => {
      const list = (v: any) => Array.isArray(v) ? v : [];
      this.chips = list(t[keys[0]]);
      this.personas = list(t[keys[1]]);
      this.spotlights = list(t[keys[2]]);
      this.features = list(t[keys[3]]);
      this.controlPoints = list(t[keys[4]]);
    });
  }

  scroll(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openShot(src: string): void {
    this.selectedShot = src;
    document.body.style.overflow = 'hidden';
  }

  closeShot(): void {
    this.selectedShot = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedShot) {
      this.closeShot();
    }
  }
}
