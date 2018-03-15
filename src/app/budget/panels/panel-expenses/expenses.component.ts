import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { UserExpense, UserTransaction } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class PanelExpensesComponent implements OnInit {

  userExpenses: Observable<UserExpense[]>;
  categories: Observable<Category[]>;
  plannedExpensesTotal: number = 0;
  actualExpensesTotal: number = 0;
  differencesTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;

  selectedTransactions: UserTransaction[];
  selectedTransactionCategoryName: string;

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
        this.getExpenses();
      }
    )
    this.categories = this.budgetService.getExpenseMonths();
  }

  getExpenses(): void {
    if (!this.user || !this.year) { return; }
    this.userExpenses = this.budgetService.getUserExpense(this.user, this.year, this.filterControls.activeCategories);
    this.userExpenses.subscribe(t => {
      this.summarizeExpenses(t);
      // this.panelChartService.sendData(this.summarizeExpensesByMonth(t));
    });
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getExpenses();
  }

  summarizeExpenses(expenses: UserExpense[]) {
    this.plannedExpensesTotal = 0;
    this.actualExpensesTotal = 0;
    this.differencesTotal = 0;
    expenses.forEach(t => {
      this.plannedExpensesTotal += t.plannedExpense;
      this.actualExpensesTotal += t.actualExpense;
      this.differencesTotal += t.difference;
    });
  }
  getExpensePage(expense: UserExpense) {
    if (expense.month) {
      this.budgetService.getUserTransactionByMonth(this.user, this.year, this.monthMap[expense.month], expense.categoryName)
        .subscribe(i => this.selectedTransactions = i);
    }
    else {
      this.budgetService.getUserTransactions(this.user, this.year, [expense.categoryName])
        .subscribe(i => this.selectedTransactions = i);
    }

    this.selectedTransactionCategoryName = expense.categoryName;
  }

  // summarizeExpensesByMonth(expenses: UserExpense[]) {
  //   expenses.forEach(t => t.date = this.datePipe.transform(t.date, 'MM'));
  //   return expenses
  // }

  modalClose() {
    this.selectedTransactions = null;
    this.selectedTransactionCategoryName = null;
  }

}
