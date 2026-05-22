import { Component, OnInit } from '@angular/core';
import { trigger, query, stagger, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('animateFooter', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(60, [
            animate(
              '350ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void { }
}
