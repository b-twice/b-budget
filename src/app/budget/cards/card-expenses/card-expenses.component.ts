import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserTransaction } from '../../models';


@Component({
  selector: 'budget-expenses-card',
  templateUrl: './card-expenses.component.html',
  styleUrls: ['./card-expenses.component.scss']
})
export class CardExpensesComponent implements OnInit {

  @Input() transactionCategoryName: string;
  @Input() transactions: UserTransaction[];
  @Output() onModalClose = new EventEmitter();
  transactionsTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor() { }

  ngOnInit() {
    this.transactions.forEach(i => {
      this.transactionsTotal += i.amount;
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
