import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { AnnualFoodProduct } from '../../models';
import { Grocery } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';

@Component({
  selector: 'budget-panel-food-products',
  templateUrl: './food-products.component.html',
  styleUrls: ['./food-products.component.scss']
})
export class PanelFoodProductsComponent implements OnInit {

  AnnualFoodProducts: Observable<AnnualFoodProduct[]>;
  food_productsTotal: number = 0;
  foodCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;

  selectedFoodProducts: Grocery[];
  selectedGrocery: Grocery | null;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
        this.getFoodProducts();
      }
    )
    this.foodCategories = this.apiService.getFoodCategories();
  }

  getFoodProducts(): void {
    if (!this.user || !this.year) { return; }
    this.AnnualFoodProducts = this.apiService.getAnnualFoodProduct(this.user, this.year, this.filterControls.activeCategories);
    this.AnnualFoodProducts.subscribe(t => {
      this.summarizeFoodProducts(t);
    });
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getFoodProducts();
  }

  summarizeFoodProducts(food_products: AnnualFoodProduct[]) {
    this.food_productsTotal = 0;
    food_products.forEach(g => this.food_productsTotal += g.amount);
  }

  getFoodProductPage(groceryName: string) {
    this.apiService.getGroceriesByName(this.user, this.year, groceryName).subscribe(i => { this.selectedFoodProducts = i });
    this.selectedGrocery = new Grocery(null, null, null, groceryName);
  }
  modalClose() {
    this.selectedFoodProducts = null;
    this.selectedGrocery = null;
  }


}
