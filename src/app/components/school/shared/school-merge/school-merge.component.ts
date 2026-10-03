import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-school-merge',
  templateUrl: './school-merge.component.html',
  styleUrls: ['./school-merge.component.scss']
})
export class SchoolMergeComponent {
  // Partner (school / ministry) side. When no logo is given only the company card is shown.
  @Input() partnerLogo: string | null = null;
  @Input() partnerNameKey: string | null = null;
  @Input() companyLogo = 'assets/images/logo.png';
  @Input() companyNameKey = 'Banner.name';
  @Input() resultKey = '';
}
