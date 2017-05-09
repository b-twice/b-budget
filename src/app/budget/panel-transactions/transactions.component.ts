import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../services/budget.service';
import { UserTransaction } from '../models';
import { Category } from '../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class PanelTransactionsComponent implements OnInit {

  userTransactions: Observable<UserTransaction[]>;
  transactionsTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;


  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
    public panelChartService: PanelChartService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
        this.getTransactions();
      }
    )
  }

  getTransactions(): void {
    if (!this.user || !this.year) { return; }
    this.userTransactions = this.budgetService.getUserTransaction(this.user, this.year, this.filterControls.userCategories);
    this.userTransactions.subscribe(t => {
      this.summarizeTransactions(t);
      this.panelChartService.sendData(this.summarizeTransactionsByMonth(t));
    });
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getTransactions();
  }

  summarizeTransactions(transactions: UserTransaction[]) {
    this.transactionsTotal = 0;
    transactions.forEach(t => this.transactionsTotal += t.amount);
  }

  summarizeTransactionsByMonth(transactions: UserTransaction[]) {
    transactions.forEach(t => t.date = this.datePipe.transform(t.date, 'MM'));
    return transactions
  }

}
