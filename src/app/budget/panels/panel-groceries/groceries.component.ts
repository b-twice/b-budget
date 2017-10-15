import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { UserGrocery } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../../panel-chart/panel-chart.service';

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
    this.userGroceries = this.budgetService.getUserGrocery(this.user, this.year, this.filterControls.activeCategories);
    this.userGroceries.subscribe(t => {
      this.summarizeGroceries(t);
      this.panelChartService.sendData(this.summarizeGroceriesByMonth(t));
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

  summarizeGroceries(groceries: UserGrocery[]) {
    this.groceriesTotal = 0;
    groceries.forEach(g => this.groceriesTotal += g.amount);
  }

  summarizeGroceriesByMonth(groceries: UserGrocery[]) {
    groceries.forEach(t => t.date = this.datePipe.transform(t.date, 'MM'));
    return groceries
  }

  getGroceryPage(groceryName: string) {
    this.budgetService.getUserGroceryByName(this.user, this.year, groceryName).subscribe(i => this.selectedGroceries = i);
    this.selectedGroceryName = groceryName;
  }
  modalClose() {
    this.selectedGroceries = null;
    this.selectedGroceryName = null;
  }


}

