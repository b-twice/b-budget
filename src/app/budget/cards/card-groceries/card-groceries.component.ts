import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Grcocery } from '../../models';
import { GroceryFormComponent } from '../../forms/grocery/grocery-form.component';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'budget-groceries-card',
  templateUrl: './card-groceries.component.html',
  styleUrls: ['./card-groceries.component.scss']
})
export class CardGroceriesComponent implements OnInit {

  @Input() grocery: Grcocery;
  @Input() groceries: Grcocery[];
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
    public budgetService: BudgetService
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

  onSubmit(item: Grcocery) {
    this.budgetService.putGrocery(item.id, item).subscribe(result => {
      this.editing = false;
    }, error => { console.log(error); });

  }

}
