import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolSharedComponent } from './school-shared.component';
import { SchoolMergeComponent } from './school-merge/school-merge.component';

@NgModule({
  declarations: [
    SchoolSharedComponent,
    SchoolMergeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    SchoolSharedComponent,
    SchoolMergeComponent
  ]
})
export class SchoolSharedModule { }
