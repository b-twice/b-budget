import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../../services/food.service';
import { Grocery } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormGroceryComponent } from '../../../forms/food/grocery/form-grocery.component';
import { AppService } from '../../../services/app.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
  selector: 'budget-panel-grocery-cart',
  templateUrl: './grocery-cart.component.html',
  styleUrls: ['./grocery-cart.component.scss']
})
export class PanelGroceryCartComponent extends PanelBaseComponent implements OnInit {

  groceryCart: Grocery[];
  cartTotal: number = 0;
  saveError: boolean = false;

  @ViewChild(FormGroceryComponent, { static: false })
  form: FormGroceryComponent;


  constructor(
    public route: ActivatedRoute,
    public location: Location,
    public apiService: FoodService,
    public appService: AppService
  ) {
    super(route, appService);
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
    this.form.rebuild();
  }

  editItem(item: Grocery, index: number) {
    this.form.model = item;
    this.removeItem(index);
  }
  removeItem(index: number): void {
    this.cartTotal -= this.groceryCart[index].amount;
    this.groceryCart.splice(index, 1);
  }

  checkout(): void {
    this.saveError = false;
    let data = { basket: this.groceryCart }
    this.apiService.checkoutGroceries(data).subscribe(result => {
      this.groceryCart = [];
      this.cartTotal = 0;
    }, error => { this.form.throwError(error); this.saveError = true; });

  }

}

