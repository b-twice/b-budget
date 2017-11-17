import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { UserGrocery, UserExpenseMonthly } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class PanelGroceriesComponent implements OnInit {

  userGroceries: Observable<UserGrocery[]>;
  groceriesTotal: number = 0;
  foodCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;

  selectedGroceries: UserGrocery[];
  selectedGroceryName: string | null;
  chartLoaded: boolean = false;

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
        this.getGroceries();
      }
    )
    this.foodCategories = this.budgetService.getFoodCategories();
  }

  getGroceries(): void {
    if (!this.user || !this.year) { return; }
    this.userGroceries = this.budgetService.getUserGroceries(this.user, this.year, this.filterControls.activeCategories);
    this.budgetService.getUserGroceriesMonthly(this.user, this.year, 1, this.filterControls.activeCategories).subscribe(t => {
      this.summarizeGroceries(t);
      if (this.chartLoaded) {
        this.panelChartService.update(t);
      }
      else {
        this.panelChartService.draw(t);
        this.chartLoaded = true;
      }
    });

  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getGroceries();
  }

  summarizeGroceries(groceries: UserExpenseMonthly[]) {
    this.groceriesTotal = 0;
    groceries.forEach(g => this.groceriesTotal += g.amount);
  }

  getGroceryPage(groceryName: string) {
    this.budgetService.getUserGroceriesByName(this.user, this.year, groceryName).subscribe(i => this.selectedGroceries = i);
    this.selectedGroceryName = groceryName;
  }
  modalClose() {
    this.selectedGroceries = null;
    this.selectedGroceryName = null;
  }


}

