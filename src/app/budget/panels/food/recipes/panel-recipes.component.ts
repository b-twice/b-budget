import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Recipe, RecipeIngredient } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../../../shared/filter-controls/filter-controls.component';
import { PanelRecipeControlsComponent } from '../recipe-controls/recipe-controls.component';
import { PanelChartService } from '../../core/chart/panel-chart.service';
import { AppService } from '../../../services/app.service';
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

  @ViewChild(PanelRecipeControlsComponent)
  private recipeControls: PanelRecipeControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
    public panelChartService: PanelChartService,
    public appService: AppService,
    public datePipe: DatePipe
  ) {
    super(route, appService)
  }

  ngOnInit() {
    this.resolveRoutes();
    this.recipeCategories = this.apiService.getRecipeCategories();
    this.appService.editEvent$.subscribe(item => this.getData());
  }

  getData(): void {
    if (!this.user) { return; }
    this.recipes = this.apiService.getRecipesWithIngredient(this.user, this.recipeControls.searchValue, this.filterControls.activeCategories);
  }

  categoryChange() {
    this.getData();
  }

  ingredientSearch(ingredient: string) {
    this.getData();
  }
}


