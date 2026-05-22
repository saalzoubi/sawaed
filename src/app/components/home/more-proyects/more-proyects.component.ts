import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss']
})
export class MoreProyectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadData();
    this.translateService.onLangChange.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.translateService.get('OtherProjects.Projects').subscribe((data: any[]) => {
      this.projects = data;
    });
  }
}
