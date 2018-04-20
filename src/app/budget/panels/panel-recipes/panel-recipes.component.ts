import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
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

  Recipes: Observable<Recipe[]>;
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
    public budgetService: BudgetService,
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
    this.recipeCategories = this.budgetService.getRecipeCategories();
  }

  getRecipes(): void {
    if (!this.user) { return; }
    this.Recipes = this.budgetService.getRecipes(this.user, this.filterControls.activeCategories);
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getRecipes();
  }

  getRecipeIngredients(name: string) {
    this.budgetService.getRecipeIngredients(name).subscribe(i => this.recipeIngredients = i);
    this.budgetService.getRecipe(this.user, name).subscribe(r => { this.selectedRecipe = r });
  }
  recipeClose() {
    this.recipeIngredients = null;
    this.selectedRecipe = null;
  }

}


