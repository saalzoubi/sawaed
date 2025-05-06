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


    this.titleService.setTitle( 'Sawaed Al Elm' );

    this.metaService.addTags([
      {name: 'keywords', content: 'Software Development, Hardware Development, Cloud Computing, Software Engineering, Computer Engineering, Mobile Apps, Sawaed, Technologies, Elm'},
      {name: 'description', content: 'At Sawaed Al Elm, we are passionate about transforming ideas into cutting-edge digital solutions. Specializing in software development, hardware integration, and mobile application design, we empower businesses to thrive in the modern technological landscape. Our team combines innovation, precision, and technical expertise to deliver customized, scalable solutions that drive efficiency and success. Whether you\'re looking to build robust enterprise software, intelligent hardware systems, or intuitive mobile experiences, Sawaed Al Elm is your trusted technology partner. Let’s build the future together.'},
    ]);


    AOS.init();

  }
}
