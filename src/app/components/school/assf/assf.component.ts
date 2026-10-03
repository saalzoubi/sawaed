import { Component } from '@angular/core';
import { MinistryComponent } from '../ministry/ministry.component';

@Component({
  selector: 'app-assf',
  templateUrl: '../ministry/ministry.component.html',
  styleUrls: ['../ministry/ministry.component.scss']
})
export class AssfComponent extends MinistryComponent {
  override logoPath = 'assets/images/assf-logo.jpg';
  override partnerNameKey = 'School.Branding.SchoolName.Assf';
  override excludedSections = ['smart-teacher', 'security', 'model'];
}
