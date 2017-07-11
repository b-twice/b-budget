import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserGrocery } from '../models';


@Component({
  selector: 'budget-groceries-card',
  templateUrl: './card-groceries.component.html',
  styleUrls: ['./card-groceries.component.scss']
})
export class CardGroceriesComponent implements OnInit {

  @Input() groceryName: string;
  @Input() groceries: UserGrocery[];
  @Output() onModalClose = new EventEmitter();
  groceriesTotal: number = 0;
  groceriesOrganicTotal: number = 0;
  groceriesSeasonalTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor() { }

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


}
