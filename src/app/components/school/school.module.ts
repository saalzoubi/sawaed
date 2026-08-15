import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchoolComponent } from './school.component';
import { SchoolSharedModule } from './shared/school-shared.module';
import { RamthaComponent } from './ramtha/ramtha.component';
import { AssfComponent } from './assf/assf.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SchoolComponent,
    RamthaComponent,
    AssfComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SchoolSharedModule,
    TranslateModule
  ]
})
export class SchoolModule { }
