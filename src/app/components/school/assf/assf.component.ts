import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-assf',
  templateUrl: './assf.component.html',
  styleUrls: ['./assf.component.scss']
})
export class AssfComponent implements OnInit {
  logoPath = 'assets/images/assf-logo.jpg';
  nameKey = 'School.Branding.SchoolName.Assf';

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.switchLang('ar');
  }
}
