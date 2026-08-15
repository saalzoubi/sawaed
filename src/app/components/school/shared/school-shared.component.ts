import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-school-shared',
  templateUrl: './school-shared.component.html',
  styleUrls: ['./school-shared.component.scss']
})
export class SchoolSharedComponent implements OnInit {

  @Input() logoPath: string | null = null;
  @Input() schoolNameKey: string | null = null;

  catalog: any[] = [];
  problems: any[] = [];
  benefits: any[] = [];
  comparison: any[] = [];

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
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
    this.translateService.get('School.Catalog').subscribe((data: any[]) => {
      this.catalog = data;
    });
    this.translateService.get('School.Problems').subscribe((data: any[]) => {
      this.problems = data;
    });
    this.translateService.get('School.Benefits').subscribe((data: any[]) => {
      this.benefits = data;
    });
    this.translateService.get('School.Comparison').subscribe((data: any[]) => {
      this.comparison = data;
    });
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
}
