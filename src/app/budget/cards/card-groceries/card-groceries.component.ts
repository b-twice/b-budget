import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Grocery } from '../../models';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryFormComponent } from '../../forms/grocery/grocery-form.component';
import { FoodService } from '../../services/food.service';


@Component({
  selector: 'budget-groceries-card',
  templateUrl: './card-groceries.component.html',
  styleUrls: ['./card-groceries.component.scss']
})
export class CardGroceriesComponent implements OnInit {

  user: string;
  year: string;
  groceryName: string;

  groceries: Observable<Grocery[]>;
  onModalClose = new EventEmitter();
  groceriesTotal: number = 0;
  groceriesOrganicTotal: number = 0;
  groceriesSeasonalTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  editing: boolean = false;

  @ViewChild(GroceryFormComponent)
  form: GroceryFormComponent;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public apiService: FoodService
  ) { }

  ngOnInit() {
    // tried to use forkjoin but would never subscribe...
    this.route.parent.params.subscribe(params => {
      this.user = params['user'];
      this.year = params['year'];
      this.getGroceries();
    })
    this.route.params.subscribe(params => {
      this.groceryName = params['name'];
      this.getGroceries();
    })
  }


  getGroceries(): void {
    if (!this.user || !this.year || !this.groceryName) { return; }
    this.groceries = this.apiService.getGroceriesByName(this.user, this.year, this.groceryName);
    this.groceries.subscribe(i => i.forEach(g =>
      this.groceriesTotal += g.amount
    ));

  }

  closeModal() {
    this.router.navigate(['.', { outlets: { list: null } }], { relativeTo: this.route.parent });
  }

  stopPropogation(event): void { event.stopPropagation(); }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  edit(grocery) {
    this.router.navigate(['.', { outlets: { list: null, form: [grocery.id] } }], { relativeTo: this.route.parent });
  }

}
