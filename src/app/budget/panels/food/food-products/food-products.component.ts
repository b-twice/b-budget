import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { AnnualFoodProduct, Grocery } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../../../shared/filter-controls/filter-controls.component';
import { AppService } from '../../../services/app.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
  selector: 'budget-panel-food-products',
  templateUrl: './food-products.component.html',
  styleUrls: ['./food-products.component.scss']
})
export class PanelFoodProductsComponent extends PanelBaseComponent implements OnInit {

  annualFoodProducts: Observable<AnnualFoodProduct[]>;
  foodProductsTotal: number = 0;
  foodCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;
  panel: string;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
    public appService: AppService,
    public datePipe: DatePipe
  ) {
    super(route, appService);
  }

  ngOnInit() {
    this.resolveRoutes();
    this.foodCategories = this.apiService.getFoodCategories();
  }

  getData(): void {
    if (!this.user || !this.year) { return; }
    this.annualFoodProducts = this.apiService.getAnnualFoodProduct(this.user, this.year, this.filterControls.activeCategories);
    this.annualFoodProducts.subscribe(t => {
      this.summarizeFoodProducts(t);
    });
  }

  categoryChange() {
    this.getData();
  }

  summarizeFoodProducts(foodProducts: AnnualFoodProduct[]) {
    this.foodProductsTotal = 0;
    foodProducts.forEach(g => this.foodProductsTotal += g.amount);
  }

}
