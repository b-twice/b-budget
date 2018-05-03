import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../../services/finance.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component'


@Component({
  selector: 'budget-expenses-modal',
  templateUrl: './modal-expenses.component.html',
  styleUrls: ['./modal-expenses.component.scss']
})
export class ModalExpensesComponent extends ModalBaseComponent implements OnInit {

  user: string;
  year: string;
  category: string;
  month: string;
  transactions: Observable<Transaction[]>;
  transactionsTotal: number = 0;

  monthMap: any = {
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12",
  };

  constructor(
    public route: ActivatedRoute,
    public apiService: FinanceService,
    public location: Location
  ) {
    super(location)
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.user = params['user'];
      this.year = params['year'];
      this.getData();
    });
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.month = params['month'];
      this.getData();
    })
  }

  getData() {
    if (!((this.category || this.month) && this.user && this.year)) return;
    if (this.month) {
      this.transactions = this.apiService.getTransactionByMonth(this.user, this.year, this.monthMap[this.month], this.category);
    }
    else {
      this.transactions = this.apiService.getTransactions(this.user, this.year, [this.category]);
    }
    this.transactions.subscribe(transactions =>
      transactions.forEach(i =>
        this.transactionsTotal += i.amount)
    );
  }
}
