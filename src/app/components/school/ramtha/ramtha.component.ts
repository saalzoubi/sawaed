import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ramtha',
  templateUrl: './ramtha.component.html',
  styleUrls: ['./ramtha.component.scss']
})
export class RamthaComponent {
  logoPath = 'assets/images/ramtha-logo.jpg';
  nameKey = 'School.Branding.SchoolName.Ramtha';

  constructor(private translateService: TranslateService) { }
}
