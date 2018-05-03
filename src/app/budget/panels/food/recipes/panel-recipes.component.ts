import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Recipe, RecipeIngredient } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../../../shared/filter-controls/filter-controls.component';
import { PanelChartService } from '../../core/chart/panel-chart.service';
import { NavigationService } from '../../../services/navigation.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'


@Component({
  selector: 'budget-panel-recipes',
  templateUrl: './panel-recipes.component.html',
  styleUrls: ['./panel-recipes.component.scss']
})
export class PanelRecipesComponent extends PanelBaseComponent implements OnInit {

  recipes: Observable<Recipe[]>;
  recipeCategories: Observable<Category[]>;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
    public panelChartService: PanelChartService,
    public navigationService: NavigationService,
    public datePipe: DatePipe
  ) {
    super(route, navigationService)
  }

  ngOnInit() {
    this.resolveRoutes();
    this.recipeCategories = this.apiService.getRecipeCategories();
  }

  getData(): void {
    if (!this.user) { return; }
    this.recipes = this.apiService.getRecipes(this.user, this.filterControls.activeCategories);
  }

  categoryChange() {
    this.getData();
  }
}


