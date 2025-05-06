import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from 'src/app/services/language/language.service'
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{

    this.languageService.initLanguage();


    this.titleService.setTitle( 'Saleem Alzoubi' );

    this.metaService.addTags([
      {name: 'keywords', content: 'Technical Manager,solutions architect, development team lead, fullstack developer, java developer, development, senior developer'},
      {name: 'description', content: 'I am a seasoned Technical Manager with over 10 years of experience in the field. My certifications include PMP, Scrum Master, OCP, and OCA, highlighting my expertise in project management and technical leadership. ' +
          'My technical skill set encompasses a broad range of areas, including server implementation, backend and frontend development, mobile applications, and database management. This comprehensive knowledge allows me to oversee all aspects of a project, from database design to frontend and mobile application development.' +
          ' I have managed projects involving up to 15 team members and multiple stakeholders, excelling in project management tasks and delivering insightful reports to directors and stakeholders. My responsibilities also include overseeing team performance, reviewing code, advising on clean coding practices, and optimizing implementation and database structures for enhanced performance, security, and maintainability.' +
          ' Additionally, I contribute to defining business requirements for product owners, ensuring that any gaps are addressed to provide valuable insights to end users.'},
    ]);


    AOS.init();

  }
}
