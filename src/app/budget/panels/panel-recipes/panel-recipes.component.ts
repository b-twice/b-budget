import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Recipe, RecipeIngredient } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-recipes',
  templateUrl: './panel-recipes.component.html',
  styleUrls: ['./panel-recipes.component.scss']
})
export class PanelRecipesComponent implements OnInit {

  recipes: Observable<Recipe[]>;
  recipesTotal: number = 0;
  recipeCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  recipeIngredients: RecipeIngredient[];
  selectedRecipe: Recipe;

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
        this.getRecipes();
      }
    )
    this.recipeCategories = this.apiService.getRecipeCategories();
  }

  getRecipes(): void {
    if (!this.user) { return; }
    this.recipes = this.apiService.getRecipes(this.user, this.filterControls.activeCategories);
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getRecipes();
  }

  getRecipeIngredients(recipe: Recipe) {
    this.apiService.getRecipeIngredients(recipe.name).subscribe(i => this.recipeIngredients = i);
    this.selectedRecipe = recipe;
  }
  recipeClose() {
    this.recipeIngredients = null;
    this.selectedRecipe = null;
  }

}


