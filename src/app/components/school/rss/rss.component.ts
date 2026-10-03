import { Component } from '@angular/core';
import { MinistryComponent } from '../ministry/ministry.component';

@Component({
  selector: 'app-rss',
  templateUrl: '../ministry/ministry.component.html',
  styleUrls: ['../ministry/ministry.component.scss']
})
export class RssComponent extends MinistryComponent {
  override logoPath = 'assets/images/rss-logo.jpg';
  override partnerNameKey = 'School.Branding.SchoolName.Rss';
  override textKey = 'SchoolPage';
}
