import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Grocery, TransactionMonthly } from '../../models';
import { Category, NavigationParams } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';
import { NavigationService } from '../../services/navigation.service';
import { PanelBaseComponent } from '../panel-base/panel-base.component'

@Component({
  selector: 'budget-panel-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class PanelGroceriesComponent extends PanelBaseComponent implements OnInit {

  groceries: Observable<Grocery[]>;
  groceriesTotal: number = 0;
  foodCategories: Observable<Category[]>;
  chartLoaded: boolean = false;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
    public panelChartService: PanelChartService,
    public navigationService: NavigationService,
    public datePipe: DatePipe,
    public router: Router
  ) {
    super(route, navigationService);
  }

  ngOnInit() {
    this.resolveRoutes();
    this.foodCategories = this.apiService.getFoodCategories();
  }

  getData(): void {
    this.groceries = this.apiService.getGroceries(this.user, this.year, this.filterControls.activeCategories);
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

  categoryChange() {
    this.getData();
  }

  summarizeGroceries(groceries: TransactionMonthly[]) {
    this.groceriesTotal = 0;
    groceries.forEach(g => {
      if (g.year == this.year) {
        this.groceriesTotal += g.amount
      }
    });
  }

}

