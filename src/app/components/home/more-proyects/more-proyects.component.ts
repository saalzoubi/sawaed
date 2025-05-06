import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss']
})
export class MoreProyectsComponent implements OnInit {
  projects: any[] = [];

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.loadData();
    this.translateService.onLangChange.subscribe(() => {
      this.loadData();
    });
  }

  redirect(route: string, event): void {
    const id = event.target.id;
    if (id === 'demoLink' || id === 'ghLink') {
      return;
    }
    window.open(route, '_blank');
  }

  loadData(): void {
    this.translateService.get('OtherProjects.Projects').subscribe((data: any[]) => {
      this.projects = data;
    });
  }

}
