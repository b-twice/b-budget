import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { RecipeIngredient, Recipe } from '../../../models/food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component'

@Component({
  selector: 'budget-recipe-ingredients',
  templateUrl: './modal-recipe-ingredients.component.html',
  styleUrls: ['./modal-recipe-ingredients.component.scss']
})
export class ModalRecipeIngredientsComponent extends ModalBaseComponent implements OnInit {

  recipeName: string;
  ingredients: RecipeIngredient[];
  recipe: Observable<Recipe>;
  recipeTotal: number = 0;
  recipeOrganicTotal: number = 0;
  recipeSeasonalTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public apiService: FoodService,
    public location: Location
  ) {
    super(location)
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeName = params['name'];
      this.getData();
    });
    this.ingredients.forEach(i => {
      this.recipeTotal += i.cost;
      this.recipeOrganicTotal += i.costOrganic;
      this.recipeSeasonalTotal += i.costSeasonal;
    });
  }

  getData() {
    this.recipe = this.apiService.getRecipe(this.recipeName);
    this.apiService.getRecipeIngredients([this.recipeName]).subscribe(ingredients => {
      this.ingredients = ingredients;
      // this should be stuffed on the recipe rather then summarized here
      ingredients.forEach(i => {
        this.recipeTotal += i.cost;
        this.recipeOrganicTotal += i.costOrganic;
        this.recipeSeasonalTotal += i.costSeasonal;
      });
    });
  }

}
