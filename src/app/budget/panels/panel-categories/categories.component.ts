import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../services/finance.service';
import { UserCategoryGrowth } from '../../models';
import { UtilService } from '../../../shared/util/util.service';
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
  userCategories: Observable<UserCategoryGrowth[]>;
  name: string;
  year: string;

  constructor(
    public route: ActivatedRoute,
    public apiService: FinanceService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params =>
        this.getFinance(params['user'], params['year'])
    )
  }

  getFinance(name: string, year: string): void {
    if (!name || !year) { return; }
    this.name = name;
    this.year = year;
    this.userCategories = this.apiService.getUserCategoryGrowth(name, year);
  }

}


