import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  private sectionObservers: IntersectionObserver[] = [];
  private readonly trackedSections = ['about', 'services', 'product', 'contact'];

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.trackPageView('/home');
  }

  ngAfterViewInit(): void {
    this.trackedSections.forEach(sectionId => {
      const el = document.getElementById(sectionId);
      if (!el) { return; }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.analytics.trackSectionView(sectionId);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(el);
      this.sectionObservers.push(observer);
    });
  }

  ngOnDestroy(): void {
    this.sectionObservers.forEach(o => o.disconnect());
  }
}
