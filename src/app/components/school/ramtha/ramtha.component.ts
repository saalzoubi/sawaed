import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-ramtha',
  templateUrl: './ramtha.component.html',
  styleUrls: ['./ramtha.component.scss']
})
export class RamthaComponent implements OnInit {
  logoPath = 'assets/images/ramtha-logo.jpg';
  nameKey = 'School.Branding.SchoolName.Ramtha';
  subtitleKey = 'School.Hero.Subtitle.Ramtha';

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.switchLang('ar');
  }
}
