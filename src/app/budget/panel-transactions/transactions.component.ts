import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserTransaction } from '../models';
import { Category } from '../models';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'budget-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class PanelTransactionsComponent implements OnInit {

  loaded: boolean = false;
  userTransactions: Observable<UserTransaction[]>;
  categories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  userCategories: string[] = [];
  user: string;
  year: string;

  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
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
    // this.loaded = false;
    if (!this.user || !this.year) { return; }
    console.log(this.userCategories)
    if (name == "All") this.userTransactions = this.budgetService.getUserTransactions(this.year, this.userCategories);
    else this.userTransactions = this.budgetService.getUserTransaction(this.user, this.year, this.userCategories);
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  filterCategory(category: Category) {
    let inList: number = this.userCategories.indexOf(category.name);
    if (inList == -1) {
      this.userCategories.push(category.name);
    }
    else {
      this.userCategories.splice(inList, 1);
    };
    this.getTransactions()

  }

}
