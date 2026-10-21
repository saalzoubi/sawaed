import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from 'src/app/services/language/language.service';
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



    this.metaService.addTags([
      {name: 'keywords', content: 'Sawaed Elm, Software Development, Hardware Development, Cloud Computing, Software Engineering, Computer Engineering,development,technologies, Mobile Apps, Sawaed, Technologies, Elm,سواعد العلم , علم, سواعد, علم للتقنيات, سواعد للتقنيات, اندرويد, ايفون هندسة البرمجيات, هندسة الحاسوب, تطوير البرمجيات, تكنولوجيا, تطبيقات, برمجة'},
    ]);


    AOS.init();

  }
}
