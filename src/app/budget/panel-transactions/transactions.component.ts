import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserTransaction } from '../models';
import { UtilService } from '../../shared/util/util.service';


@Component({
  selector: 'budget-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class PanelTransactionsComponent implements OnInit {

  private loaded: boolean = false;
  private userTransactions: UserTransaction[];

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params =>
        this.getTransactions(params['user'], params['year'])
    )
  }

  getTransactions(name: string, year: string): void {
    this.loaded = false;
    if (!name || !year) { return; }
    if (name == "All") {
      this.budgetService.getUserTransactions(year)
        .subscribe(
        userTransactions => this.setTransactions(userTransactions)
        );
      return;
    }
    this.budgetService.getUserTransaction(name, year)
      .subscribe(
      userTransactions => this.setTransactions(userTransactions)
      )
  }

  setTransactions(transactions: UserTransaction[]) {
    this.userTransactions = transactions;
    this.loaded = true;
  }

  sort(property) {
    this.loaded = false;
    // get key based on pos of column name (assumes same order)
    let type = typeof this.userTransactions[0][property];
    this.userTransactions.sort(this.dynamicSort(property, type));
    this.loaded = true;
  }
  dynamicSort(property: string, type: string) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    if (type === 'number') return (a, b) => (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    if (type === 'string') return (a, b) => a[property].localeCompare(b[property]);
  }

}
