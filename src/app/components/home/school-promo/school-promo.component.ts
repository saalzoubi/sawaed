import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

// Home-page teaser linking to the school platform overview (/product/school).
@Component({
  selector: 'app-school-promo',
  templateUrl: './school-promo.component.html',
  styleUrls: ['./school-promo.component.scss']
})
export class SchoolPromoComponent {
  constructor(public languageService: LanguageService) {}
}
