import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { UserFoodProduct } from '../../models';
import { UserGrocery } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';

@Component({
  selector: 'budget-panel-food-products',
  templateUrl: './food-products.component.html',
  styleUrls: ['./food-products.component.scss']
})
export class PanelFoodProductsComponent implements OnInit {

  userFoodProducts: Observable<UserFoodProduct[]>;
  food_productsTotal: number = 0;
  foodCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;

  selectedFoodProducts: UserGrocery[];
  selectedGrocery: UserGrocery | null;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
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
    this.foodCategories = this.budgetService.getFoodCategories();
  }

  getFoodProducts(): void {
    if (!this.user || !this.year) { return; }
    this.userFoodProducts = this.budgetService.getUserFoodProduct(this.user, this.year, this.filterControls.activeCategories);
    this.userFoodProducts.subscribe(t => {
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

  summarizeFoodProducts(food_products: UserFoodProduct[]) {
    this.food_productsTotal = 0;
    food_products.forEach(g => this.food_productsTotal += g.amount);
  }

  getFoodProductPage(groceryName: string) {
    this.budgetService.getUserGroceriesByName(this.user, this.year, groceryName).subscribe(i => { this.selectedFoodProducts = i });
    this.selectedGrocery = new UserGrocery(null, null, null, null, groceryName, null);
  }
  modalClose() {
    this.selectedFoodProducts = null;
    this.selectedGrocery = null;
  }


}
