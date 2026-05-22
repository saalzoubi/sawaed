import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(80, [
            animate(
              '500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {}

  scrollTo(section: string): void {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
