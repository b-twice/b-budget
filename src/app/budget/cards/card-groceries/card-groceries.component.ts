import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Grocery } from '../../models';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { CardBaseComponent } from '../card-base/card-base.component'


@Component({
  selector: 'budget-groceries-card',
  templateUrl: './card-groceries.component.html',
  styleUrls: ['./card-groceries.component.scss']
})
export class CardGroceriesComponent extends CardBaseComponent implements OnInit {

  user: string;
  year: string;
  groceryName: string;

  groceries: Observable<Grocery[]>;
  groceriesTotal: number = 0;
  groceriesOrganicTotal: number = 0;
  groceriesSeasonalTotal: number = 0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public apiService: FoodService,
    public location: Location
  ) {
    super(location)
  }

  ngOnInit() {
    // tried to use forkjoin but would never subscribe...
    this.route.parent.params.subscribe(params => {
      this.user = params['user'];
      this.year = params['year'];
      this.getData();
    })
    this.route.params.subscribe(params => {
      this.groceryName = params['name'];
      this.getData();
    })
  }


  getData(): void {
    if (!this.user || !this.year || !this.groceryName) { return; }
    this.groceries = this.apiService.getGroceriesByName(this.user, this.year, this.groceryName);
    this.groceries.subscribe(i => i.forEach(g =>
      this.groceriesTotal += g.amount
    ));

  }

  closeModal() {
    this.router.navigate(['.', { outlets: { list: null } }], { relativeTo: this.route.parent });
  }


  edit(grocery) {
    this.router.navigate(['.', { outlets: { list: null, form: [grocery.id] } }], { relativeTo: this.route.parent });
  }

}
