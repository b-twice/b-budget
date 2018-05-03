import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../../services/finance.service';
import { UserCategoryGrowth } from '../../../models/finance';
import { UtilService } from '../../../../shared/util/util.service';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../../../services/navigation.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'



@Component({
  selector: 'budget-panel-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class PanelCategoriesComponent extends PanelBaseComponent implements OnInit {
  displayGroupsOrder: string[] = [
    "Exercise",
    "Food",
    "Goods",
    "Transportation",
    "Utilities",
    "Miscellaneous"
  ];
  userCategories: Observable<UserCategoryGrowth[]>;

  constructor(
    public route: ActivatedRoute,
    public apiService: FinanceService,
    public navigationService: NavigationService,
    public utilService: UtilService
  ) {
    super(route, navigationService);
  }

  ngOnInit() {
    this.resolveRoutes();
  }

  getData(): void {
    this.userCategories = this.apiService.getUserCategoryGrowth(this.user, this.year);
  }

}


