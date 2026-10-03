import { Component } from '@angular/core';
import { MinistryComponent } from '../ministry/ministry.component';

@Component({
  selector: 'app-ahlquran',
  templateUrl: '../ministry/ministry.component.html',
  styleUrls: ['../ministry/ministry.component.scss']
})
export class AhlQuranComponent extends MinistryComponent {
  override logoPath = 'assets/images/ahlquran-logo.jpg';
  override partnerNameKey = 'School.Branding.SchoolName.AhlQuran';
  override excludedSections = ['smart-teacher', 'security', 'model'];
}
