import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { FoodProduct, GroceryCartItem, GroceryStore } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'budget-panel-grocery-cart',
  templateUrl: './grocery-cart.component.html',
  styleUrls: ['./grocery-cart.component.scss']
})
export class PanelGroceryCartComponent implements OnInit {

  // registerForm: FormGroup; // <--- heroForm is of type FormGroup
  foodProducts: Observable<FoodProduct[]>;
  groceryStores: Observable<GroceryStore[]>;
  user: string;
  year: string;
  foodProductsService: CompleterData;
  groceryStoresService: CompleterData;
  model: GroceryCartItem = new GroceryCartItem(null, null, null, null, null, null, 0, 0);
  groceryCart: GroceryCartItem[];
  cartTotal: number = 0;


  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
    public completerService: CompleterService,
  ) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
      }
    )
    this.foodProducts = this.budgetService.getFoodProducts();
    this.groceryStores = this.budgetService.getGroceryStores();
    this.foodProductsService = this.completerService.local(this.foodProducts, 'name', 'name');
    this.groceryStoresService = this.completerService.local(this.groceryStores, 'name', 'name');
    this.groceryCart = [];
  }

  rebuildForm() {
    this.model = new GroceryCartItem(this.model.date, this.model.store, null, null, null, null, 0, 0);
  }

  onProductSelect() {
    if (this.model.name) {
      this.budgetService.getLatestGrocery(this.model.name).subscribe(grocery => {
        if (grocery) {
          console.log(grocery.organic)
          this.model.weight = grocery.weight;
          this.model.quantity = grocery.count;
          this.model.cost = grocery.amount;
          this.model.organic = grocery.organic == 'Yes' ? 1 : 0;
          console.log(this.model.organic)
          this.model.seasonal = grocery.seasonal == 'Yes' ? 1 : 0;
        }
      });
    }
  }

  onSubmit() {
    this.groceryCart.push(this.model);
    this.cartTotal += this.model.cost;
    this.rebuildForm();
  }

  removeCartItem(index: number): void {
    this.cartTotal -= this.groceryCart[index].cost;
    this.groceryCart.splice(index, 1);
  }

  checkout(): void {

  }

}

