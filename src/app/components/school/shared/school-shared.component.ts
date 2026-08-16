import { Component, OnInit, Input, HostListener } from '@angular/core';
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
  companyLogoPath = 'assets/images/logo.png';
  companyNameKey = 'Banner.name';

  catalog: any[] = [];
  problems: any[] = [];
  benefits: any[] = [];
  comparison: any[] = [];

  currentProblemSlide = 0;
  problemsPerView = 3;
  selectedProblem: any = null;
  isModalOpen = false;

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

    this.updateProblemsPerView();
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

  nextProblemSlide(): void {
    const maxIndex = this.problems.length - this.problemsPerView;
    if (this.currentProblemSlide < maxIndex) {
      this.currentProblemSlide++;
    }
  }

  prevProblemSlide(): void {
    if (this.currentProblemSlide > 0) {
      this.currentProblemSlide--;
    }
  }

  canNextProblem(): boolean {
    return this.currentProblemSlide < this.problems.length - this.problemsPerView;
  }

  canPrevProblem(): boolean {
    return this.currentProblemSlide > 0;
  }

  goToProblemSlide(index: number): void {
    const maxIndex = this.problems.length - this.problemsPerView;
    this.currentProblemSlide = Math.min(index, Math.max(0, maxIndex));
  }

  openProblemModal(problem: any): void {
    this.selectedProblem = problem;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeProblemModal(): void {
    this.isModalOpen = false;
    this.selectedProblem = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeProblemModal();
    }
  }

  isRtl(): boolean {
    return this.translateService.currentLang === 'ar' || this.translateService.getDefaultLang() === 'ar';
  }

  updateProblemsPerView(): void {
    if (typeof window !== 'undefined') {
      this.problemsPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 992 ? 2 : 3);
      const maxIndex = this.problems.length - this.problemsPerView;
      if (this.currentProblemSlide > maxIndex) {
        this.currentProblemSlide = Math.max(0, maxIndex);
      }
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateProblemsPerView();
  }
}
