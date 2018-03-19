import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { FoodProduct, GroceryCartItem } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'budget-panel-grocery-cart',
  templateUrl: './grocery-cart.component.html',
  styleUrls: ['./grocery-cart.component.scss']
})
export class PanelGroceryCartComponent implements OnInit {

  // registerForm: FormGroup; // <--- heroForm is of type FormGroup
  foodProducts: Observable<FoodProduct[]>;
  user: string;
  year: string;
  dataService: CompleterData;
  model: GroceryCartItem = new GroceryCartItem(null, null, null, null);
  groceryCart: GroceryCartItem[];


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
    this.dataService = this.completerService.local(this.foodProducts, 'name', 'name');
    this.groceryCart = [];
  }

  rebuildForm() {
    this.model = new GroceryCartItem(null, null, null, null);
  }

  onSubmit() {
    this.groceryCart.push(this.model);
    this.rebuildForm();
  }

}

