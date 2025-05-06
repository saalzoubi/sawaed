import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {LanguageService} from '../../../services/language/language.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit {

  customOptions: OwlOptions = {
    rtl: false,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000
  };

  @ViewChild('imgContainer') imgContainer: ElementRef;

  constructor(
    public languageService: LanguageService,
  ) { }

  ngOnInit(): void {
  }

// tslint:disable-next-line:typedef
debug(){

  this.imgContainer.nativeElement.scroll({
    top: this.imgContainer.nativeElement.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}

  // tslint:disable-next-line:typedef
  isLTR(){
    return this.languageService.textDirection === 'ltr';
}
}
