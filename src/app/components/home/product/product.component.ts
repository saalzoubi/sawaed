import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  features: any[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadData();
    this.translateService.onLangChange.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.translateService.get('CoreProduct.Features').subscribe((data: any[]) => {
      this.features = data;
    });
  }
}
