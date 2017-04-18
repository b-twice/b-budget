import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserCategory } from '../models';
import { UtilService } from '../../shared/util/util.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'budget-panel-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class PanelCategoriesComponent implements OnInit {
  displayGroupsOrder: string[] = [
    "Exercise",
    "Food",
    "Goods",
    "Transportation",
    "Utilities",
    "Miscellaneous"
  ];
  userCategories: Observable<UserCategory[]>;
  name: string;
  year: string;

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
    if (!name || !year) { return; }
    this.name = name;
    this.year = year;
    this.userCategories = this.budgetService.getUserCategory(name, year)
  }

}


