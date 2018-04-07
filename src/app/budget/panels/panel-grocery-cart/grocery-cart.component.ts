import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { FoodProduct, GroceryCartItem, Supermarket } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'budget-panel-grocery-cart',
  templateUrl: './grocery-cart.component.html',
  styleUrls: ['./grocery-cart.component.scss']
})
export class PanelGroceryCartComponent implements OnInit {

  // registerForm: FormGroup; // <--- heroForm is of type FormGroup
  foodProducts: Observable<FoodProduct[]>;
  supermarkets: Observable<Supermarket[]>;
  user: string;
  year: string;
  foodProductsService: CompleterData;
  supermarketsService: CompleterData;
  model: GroceryCartItem = new GroceryCartItem(null, null, null, null, null, null, 0, 0);
  groceryCart: GroceryCartItem[];
  cartTotal: number = 0;
  saveError: boolean = false;


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
    this.supermarkets = this.budgetService.getSupermarkets();
    this.foodProductsService = this.completerService.local(this.foodProducts, 'name', 'name');
    this.supermarketsService = this.completerService.local(this.supermarkets, 'name', 'name');
    this.groceryCart = [];
  }

  rebuildForm() {
    this.model = new GroceryCartItem(this.model.date, this.model.supermarket, null, null, null, null, 0, 0);
  }

  onProductSelect() {
    if (this.model.name) {
      this.budgetService.getLatestGrocery(this.model.name, this.model.supermarket).subscribe(grocery => {
        if (grocery) {
          this.model.weight = grocery.weight;
          this.model.quantity = grocery.count;
          this.model.cost = grocery.amount;
          this.model.organic = grocery.organic == 'Yes' ? 1 : 0;
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
    this.saveError = false;
    let basket = []
    this.groceryCart.forEach(item =>
      basket.push({
        user: this.user,
        date: item.date,
        category: "",
        supermarket: item.supermarket,
        name: item.name,
        weight: item.weight,
        quantity: item.quantity,
        amount: item.cost,
        organic: item.organic ? 'Yes' : 'No',
        seasonal: item.seasonal ? 'Yes' : 'No',
        unitPrice: 0
      })
    );
    let data = { basket: basket }
    this.budgetService.postData(data, 'grocery-cart').subscribe(result => {
      console.log('success')
      this.groceryCart = [];
    }, error => { console.log(error); this.saveError = true });
  }

}

