import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserCategory } from '../models';
import { UtilService } from '../../shared/util/util.service';


@Component({
  selector: 'budget-panel-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class PanelCategoriesComponent implements OnInit {
  private userCategories: UserCategory[];
  private displayGroupsOrder: string[] = [
    "Exercise",
    "Food",
    "Goods",
    "Transportation",
    "Utilities",
    "Miscellaneous"
  ]
  // meh, front end or store in database?
  private displayGroups: {} = {
    Alcohol: { group: "Food", total: 0 },
    Restaurants: { group: "Food", total: 0 },
    Supermarkets: { group: "Food", total: 0 },
    Fitness: { group: "Exercise", total: 0 },
    Golf: { group: "Exercise", total: 0 },
    Clothing: { group: "Goods", total: 0 },
    Home: { group: "Goods", total: 0 },
    "Home Improvement": { group: "Goods", total: 0 },
    Merchandise: { group: "Goods", total: 0 },
    Automotive: { group: "Transportation", total: 0 },
    Gasoline: { group: "Transportation", total: 0 },
    Bike: { group: "Transportation", total: 0 },
    Insurance: { group: "Transportation", total: 0 },
    Internet: { group: "Utilities", total: 0 },
    Phone: { group: "Utilities", total: 0 },
    TV: { group: "Utilities", total: 0 },
    Gift: { group: "Miscellaneous", total: 0 },
    Haircut: { group: "Miscellaneous", total: 0 },
    Interest: { group: "Miscellaneous", total: 0 },
    Loan: { group: "Miscellaneous", total: 0 },
    Medical: { group: "Miscellaneous", total: 0 },
    Other: { group: "Miscellaneous", total: 0 },
    Taxes: { group: "Miscellaneous", total: 0 },
    Travel: { group: "Miscellaneous", total: 0 },
    "Web Development": { group: "Miscellaneous", total: 0 }
  }

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params =>
        this.getBudget(params['user'], params['year'])
    )
  }

  getBudget(name: string, year: string): void {
    this.userCategories = [];
    if (!name || !year) { return; }
    if (name == "All") {
      this.budgetService.getUserCategories(year)
        .subscribe(
        userCategories => this.summarizeCategories(userCategories)
        );
      return;
    }
    this.budgetService.getUserCategory(name, year)
      .subscribe(
      userCategories => this.summarizeCategories(userCategories)
      )
  }

  summarizeCategories(categoriesToSummarize: UserCategory[]) {
    this.clearCategoryTotals();
    categoriesToSummarize.forEach(c => {
      if (this.displayGroups.hasOwnProperty(c.categoryName)) {
        this.displayGroups[c.categoryName].total = c.amount
      }
    });
  }

  clearCategoryTotals() {
    let keys = Object.keys(this.displayGroups)
    keys.forEach(k => this.displayGroups[k].total = 0)
  }

  getDisplayGroups(group: string) {
    let displayGroups = [];
    let keys = Object.keys(this.displayGroups);
    keys.forEach(k => {
      let displayGroup = this.displayGroups[k];
      if (displayGroup.group == group) {
        displayGroups.push(displayGroup)
      }
    });
    return displayGroups
  }

  // getGrowth(key: string): number {
  //     return this.userCategory[0][key + 'Growth'];
  // }
}


