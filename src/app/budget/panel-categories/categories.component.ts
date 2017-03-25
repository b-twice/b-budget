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
  loaded: boolean = false;
  displayGroupsOrder: string[] = [
    "Exercise",
    "Food",
    "Goods",
    "Transportation",
    "Utilities",
    "Miscellaneous"
  ];
  // meh, front end or store in database?
  displayGroups: {} = {
  }

  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params =>
        this.getBudget(params['user'], params['year'])
    )
  }

  getBudget(name: string, year: string): void {
    this.loaded = false;
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
    this.displayGroups = {};
    let categorySummary = {};
    // first summarize values
    categoriesToSummarize.forEach(c => {
      if (!categorySummary.hasOwnProperty(c.categoryName)) {
        categorySummary[c.categoryName] = { group: c.categoryGroupName, total: 0, growth: 0 };
      }
      categorySummary[c.categoryName]["total"] += c.amount;
      categorySummary[c.categoryName]["growth"] += c.growth;
    });
    // build an array for each group with an o summarizing the category
    Object.keys(categorySummary).forEach(k => {
      let c = categorySummary[k];
      if (!this.displayGroups.hasOwnProperty(c.group)) {
        this.displayGroups[c.group] = [];
      }
      this.displayGroups[c.group].push({ name: k, total: c.total, growth: c.growth });
    });
    this.loaded = true;
  }

}


