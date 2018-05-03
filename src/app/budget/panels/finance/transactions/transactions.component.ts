import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../../services/finance.service';
import { Transaction, TransactionMonthly } from '../../../models/finance';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../../../shared/filter-controls/filter-controls.component';
import { PanelChartService } from '../../core/chart/panel-chart.service';
import { NavigationService } from '../../../services/navigation.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
  selector: 'budget-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class PanelTransactionsComponent extends PanelBaseComponent implements OnInit {

  transactions: Observable<Transaction[]>;
  categories: Observable<Category[]>;
  transactionsTotal: number = 0;
  chartLoaded: boolean = false;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;


  constructor(
    public route: ActivatedRoute,
    public apiService: FinanceService,
    public panelChartService: PanelChartService,
    public navigationService: NavigationService,
    public datePipe: DatePipe
  ) {
    super(route, navigationService);
  }

  ngOnInit() {
    this.resolveRoutes();
    this.categories = this.apiService.getTransactionCategories();
  }

  getData(): void {
    this.transactions = this.apiService.getTransactions(this.user, this.year, this.filterControls.activeCategories);
    this.apiService.getTransactionsMonthly(this.user, this.year, 1, this.filterControls.activeCategories).subscribe(t => {
      this.summarizeTransactions(t);
      if (this.chartLoaded) {
        this.panelChartService.update(t);
      }
      else {
        this.panelChartService.draw(t);
        this.chartLoaded = true;
      }

    });
  }

  summarizeTransactions(transactions: TransactionMonthly[]) {
    this.transactionsTotal = 0;
    transactions.forEach(t => this.year == t.year ? this.transactionsTotal += t.amount : null);
  }

}
