import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchoolComponent } from './school.component';
import { SchoolSharedModule } from './shared/school-shared.module';
import { RamthaComponent } from './ramtha/ramtha.component';
import { AssfComponent } from './assf/assf.component';
import { AhlQuranComponent } from './ahlquran/ahlquran.component';
import { RssComponent } from './rss/rss.component';
import { IgaComponent } from './iga/iga.component';
import { MinistryComponent } from './ministry/ministry.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SchoolComponent,
    RamthaComponent,
    AssfComponent,
    AhlQuranComponent,
    RssComponent,
    IgaComponent,
    MinistryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SchoolSharedModule,
    TranslateModule
  ]
})
export class SchoolModule { }
