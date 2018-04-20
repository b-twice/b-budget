import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Grocery } from '../../models';
import { GroceryFormComponent } from '../../forms/grocery/grocery-form.component';
import { FoodService } from '../../services/food.service';


@Component({
  selector: 'budget-groceries-card',
  templateUrl: './card-groceries.component.html',
  styleUrls: ['./card-groceries.component.scss']
})
export class CardGroceriesComponent implements OnInit {

  @Input() grocery: Grocery;
  @Input() groceries: Grocery[];
  @Output() onModalClose = new EventEmitter();
  groceriesTotal: number = 0;
  groceriesOrganicTotal: number = 0;
  groceriesSeasonalTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  editing: boolean = false;

  @ViewChild(GroceryFormComponent)
  groceryForm: GroceryFormComponent;


  constructor(
    public apiService: FoodService
  ) { }

  ngOnInit() {
    this.groceries.forEach(i => {
      this.groceriesTotal += i.amount;
    });

  }

  closeModal() {
    this.onModalClose.emit();
  }

  stopPropogation(event): void { event.stopPropagation(); }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  edit(grocery) {
    this.groceryForm.model = grocery;
    this.editing = true;
  }

  onSubmit(item: Grocery) {
    this.apiService.updateGrocery(item.id, item).subscribe(result => {
      this.editing = false;
    }, error => { console.log(error); });

  }

}
