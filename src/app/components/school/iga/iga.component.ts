import { Component } from '@angular/core';
import { MinistryComponent } from '../ministry/ministry.component';

@Component({
  selector: 'app-iga',
  templateUrl: '../ministry/ministry.component.html',
  styleUrls: ['../ministry/ministry.component.scss']
})
export class IgaComponent extends MinistryComponent {
  override logoPath = 'assets/images/iga-logo.jpg';
  override partnerNameKey = 'School.Branding.SchoolName.Iga';
  override textKey = 'SchoolPage';
}
