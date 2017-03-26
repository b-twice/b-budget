import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserTransaction } from '../models';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'budget-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class PanelTransactionsComponent implements OnInit {

  loaded: boolean = false;
  userTransactions: Observable<UserTransaction[]>;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params =>
        this.getTransactions(params['user'], params['year'])
    )
  }

  getTransactions(name: string, year: string): void {
    // this.loaded = false;
    if (!name || !year) { return; }
    if (name == "All") this.userTransactions = this.budgetService.getUserTransactions(year);
    else this.userTransactions = this.budgetService.getUserTransaction(name, year);
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

}
