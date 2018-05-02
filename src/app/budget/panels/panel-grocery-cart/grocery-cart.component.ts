import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Grocery, NavigationParams } from '../../models';
import { Observable } from 'rxjs/Observable';
import { GroceryFormComponent } from '../../forms/grocery/grocery-form.component';
import { NavigationService } from '../../services/navigation.service';
import { PanelBaseComponent } from '../panel-base/panel-base.component'

@Component({
  selector: 'budget-panel-grocery-cart',
  templateUrl: './grocery-cart.component.html',
  styleUrls: ['./grocery-cart.component.scss']
})
export class PanelGroceryCartComponent extends PanelBaseComponent implements OnInit {

  groceryCart: Grocery[];
  cartTotal: number = 0;
  saveError: boolean = false;

  @ViewChild(GroceryFormComponent)
  groceryForm: GroceryFormComponent;


  constructor(
    public route: ActivatedRoute,
    public location: Location,
    public apiService: FoodService,
    public navigationService: NavigationService
  ) {
    super(route, navigationService);
  }

  ngOnInit() {
    this.groceryCart = [];
    this.resolveRoutes();
  }

  back() {
    this.location.back();
  }
  onSubmit(item: Grocery) {
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
    this.apiService.checkoutGroceries(data).subscribe(result => {
      this.groceryCart = [];
      this.cartTotal = 0;
    }, error => { console.log(error); this.saveError = true });
  }

}

