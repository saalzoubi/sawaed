import { Component } from '@angular/core';
import { MinistryComponent } from '../ministry/ministry.component';

@Component({
  selector: 'app-ramtha',
  templateUrl: '../ministry/ministry.component.html',
  styleUrls: ['../ministry/ministry.component.scss']
})
export class RamthaComponent extends MinistryComponent {
  override logoPath = 'assets/images/ramtha-logo.jpg';
  override partnerNameKey = 'School.Branding.SchoolName.Ramtha';
  override textKey = 'SchoolPage';
}
