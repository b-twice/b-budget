import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { UserTransaction, UserExpenseMonthly } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class PanelTransactionsComponent implements OnInit {

  userTransactions: Observable<UserTransaction[]>;
  categories: Observable<Category[]>;
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
    this.categories = this.budgetService.getCategories();
  }

  getTransactions(): void {
    if (!this.user || !this.year) { return; }
    this.userTransactions = this.budgetService.getUserTransactions(this.user, this.year, this.filterControls.activeCategories);
    this.budgetService.getUserTransactionsMonthly(this.user, this.year, 1, this.filterControls.activeCategories).subscribe(t => {
      this.summarizeTransactions(t);
      this.panelChartService.sendData(t);
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

  summarizeTransactions(transactions: UserExpenseMonthly[]) {
    this.transactionsTotal = 0;
    transactions.forEach(t => this.year == t.year ? this.transactionsTotal += t.amount : null);
  }

}
