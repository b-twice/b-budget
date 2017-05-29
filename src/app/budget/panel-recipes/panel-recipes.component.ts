import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../services/budget.service';
import { UserRecipe, UserRecipeIngredient } from '../models';
import { Category } from '../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-recipes',
  templateUrl: './panel-recipes.component.html',
  styleUrls: ['./panel-recipes.component.scss']
})
export class PanelRecipesComponent implements OnInit {

  userRecipes: Observable<UserRecipe[]>;
  recipesTotal: number = 0;
  recipeCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  recipeIngredients: Observable<UserRecipeIngredient[]>;
  selectedRecipe: string;

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
    this.userRecipes = this.budgetService.getUserRecipe(this.user, this.filterControls.activeCategories);

    // this.userRecipes.subscribe(t => {
    // console.log(t);
    // this.summarizeRecipes(t);
    // this.panelChartService.sendData(this.summarizeRecipesByMonth(t));
    // });
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getRecipes();
  }

  // summarizeRecipesByMonth(recipes: UserRecipe[]) {
  //   recipes.forEach(t => t.date = this.datePipe.transform(t.date, 'MM'));
  //   return recipes
  // }

  getRecipeIngredients(name: string) {
    this.recipeIngredients = this.budgetService.getUserRecipeIngredients(name);
    this.selectedRecipe = name;
  }
  recipeClose(name: string) {
    this.recipeIngredients = null;

  }

}


