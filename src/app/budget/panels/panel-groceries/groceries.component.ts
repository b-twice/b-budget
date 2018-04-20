import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Grocery, TransactionMonthly } from '../../models';
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

  userGroceries: Observable<Grocery[]>;
  groceriesTotal: number = 0;
  foodCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;

  selectedGroceries: Grocery[];
  selectedGrocery: Grocery | null;
  chartLoaded: boolean = false;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
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
    this.foodCategories = this.apiService.getFoodCategories();
  }

  getGroceries(): void {
    if (!this.user || !this.year) { return; }
    this.userGroceries = this.apiService.getGroceries(this.user, this.year, this.filterControls.activeCategories);
    this.apiService.getGroceriesMonthly(this.user, this.year, 1, this.filterControls.activeCategories).subscribe(t => {
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

  summarizeGroceries(groceries: TransactionMonthly[]) {
    this.groceriesTotal = 0;
    groceries.forEach(g => {
      if (g.year == this.year) {
        this.groceriesTotal += g.amount
      }
    });
  }

  getGroceryPage(grocery: Grocery) {
    this.apiService.getGroceriesByName(this.user, this.year, grocery.name).subscribe(i => this.selectedGroceries = i);
    this.selectedGrocery = grocery;
  }
  modalClose() {
    this.selectedGroceries = null;
    this.selectedGrocery = null;
  }


}

