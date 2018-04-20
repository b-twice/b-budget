import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { Grcocery } from '../../models';
import { Observable } from 'rxjs/Observable';
import { GroceryFormComponent } from '../../forms/grocery/grocery-form.component';

@Component({
  selector: 'budget-panel-grocery-cart',
  templateUrl: './grocery-cart.component.html',
  styleUrls: ['./grocery-cart.component.scss']
})
export class PanelGroceryCartComponent implements OnInit {

  user: string;
  year: string;
  groceryCart: Grcocery[];
  cartTotal: number = 0;
  saveError: boolean = false;

  @ViewChild(GroceryFormComponent)
  groceryForm: GroceryFormComponent;


  constructor(
    public budgetService: BudgetService
  ) {
  }

  ngOnInit() {
    this.groceryCart = [];
  }

  onSubmit(item: Grcocery) {
    this.groceryCart.push(item);
    this.cartTotal += item.amount;
    this.groceryForm.rebuild();
  }

  removeCartItem(index: number): void {
    this.cartTotal -= this.groceryCart[index].amount;
    this.groceryCart.splice(index, 1);
  }

  checkout(): void {
    this.saveError = false;
    let data = { basket: this.groceryCart }
    console.log(data)
    this.budgetService.postData(data, 'grocery-cart').subscribe(result => {
      this.groceryCart = [];
      this.cartTotal = 0;
    }, error => { console.log(error); this.saveError = true });
  }

}

