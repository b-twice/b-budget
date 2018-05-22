import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from '../../../services/finance.service';
import { Expense, Transaction, ExpenseMonth } from '../../../models/finance';
import { Category, } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../../../shared/filter-controls/filter-controls.component';
import { AppService } from '../../../services/app.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
  selector: 'budget-panel-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class PanelExpensesComponent extends PanelBaseComponent implements OnInit {

  expenses: Observable<Expense[]>;
  categories: Observable<Category[]>;
  plannedExpensesTotal: number = 0;
  actualExpensesTotal: number = 0;
  differencesTotal: number = 0;
  selectedTransactions: Transaction[];
  selectedTransactionCategoryName: string;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public apiService: FinanceService,
    public appService: AppService,
    public datePipe: DatePipe
  ) {
    super(route, appService);
  }
  ngOnInit() {
    this.resolveRoutes();
    this.categories = this.apiService.getExpenseMonths();
  }

  getData(): void {
    this.expenses = this.apiService.getExpense(this.user, this.year, this.filterControls.activeCategories);
    this.expenses.subscribe(t => {
      this.summarizeExpenses(t);
    });
  }

  summarizeExpenses(expenses: Expense[]) {
    this.plannedExpensesTotal = 0;
    this.actualExpensesTotal = 0;
    this.differencesTotal = 0;
    expenses.forEach(t => {
      this.plannedExpensesTotal += t.plannedExpense;
      this.actualExpensesTotal += t.actualExpense;
      this.differencesTotal += t.difference;
    });
  }


  openTransactionsModal(expense: Expense) {
    if (expense.month) {
      this.router.navigate(['.', { outlets: { transactionsByMonth: [expense.categoryName, expense.month] } }], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['.', { outlets: { transactions: [expense.categoryName] } }], { relativeTo: this.route });
    }
  }

}
