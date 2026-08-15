import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-assf',
  templateUrl: './assf.component.html',
  styleUrls: ['./assf.component.scss']
})
export class AssfComponent {
  logoPath = 'assets/images/assf-logo.jpg';
  nameKey = 'School.Branding.SchoolName.Assf';

  constructor(private translateService: TranslateService) { }
}
