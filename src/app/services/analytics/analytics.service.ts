import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  trackPageView(pagePath: string): void {
    if (typeof gtag === 'undefined') { return; }
    gtag('event', 'page_view', { page_path: pagePath });
  }

  trackNavClick(section: string): void {
    if (typeof gtag === 'undefined') { return; }
    gtag('event', 'nav_click', { section_name: section });
  }

  trackSectionView(sectionId: string): void {
    if (typeof gtag === 'undefined') { return; }
    gtag('event', 'section_view', { section_id: sectionId });
  }

  trackEvent(eventName: string, params?: { [key: string]: any }): void {
    if (typeof gtag === 'undefined') { return; }
    gtag('event', eventName, params || {});
  }
}
