import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Grocery } from '../../../models/food';
import { TransactionMonthly } from '../../../models/finance';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../../../shared/filter-controls/filter-controls.component';
import { PanelChartService } from '../../core/chart/panel-chart.service';
import { NavigationService } from '../../../services/navigation.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

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
    public datePipe: DatePipe
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

  summarizeGroceries(groceries: TransactionMonthly[]) {
    this.groceriesTotal = 0;
    groceries.forEach(g => {
      if (g.year == this.year) {
        this.groceriesTotal += g.amount
      }
    });
  }

}

