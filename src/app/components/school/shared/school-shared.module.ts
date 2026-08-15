import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolSharedComponent } from './school-shared.component';

@NgModule({
  declarations: [
    SchoolSharedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    SchoolSharedComponent
  ]
})
export class SchoolSharedModule { }
