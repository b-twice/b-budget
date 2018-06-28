import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { RecipeIngredient, Recipe } from '../../../models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component'

@Component({
  selector: 'budget-recipe-ingredients',
  templateUrl: './modal-recipe-ingredients.component.html',
  styleUrls: ['./modal-recipe-ingredients.component.scss']
})
export class ModalRecipeIngredientsComponent extends ModalBaseComponent implements OnInit {

  id: number;
  ingredients: RecipeIngredient[];
  recipe: Observable<Recipe>;
  recipeTotal: number = 0;
  recipeOrganicTotal: number = 0;
  recipeSeasonalTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public apiService: FoodService,
    public location: Location
  ) {
    super(location)
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getData();
    });
  }

  getData() {
    this.recipe = this.apiService.getRecipe(this.id);
    this.apiService.getRecipeIngredients(this.id).subscribe(ingredients => {
      this.ingredients = ingredients;
      // this should be stuffed on the recipe rather then summarized here
      ingredients.forEach(i => {
        this.recipeTotal += i.cost;
        this.recipeOrganicTotal += i.costOrganic;
        this.recipeSeasonalTotal += i.costSeasonal;
      });
    });
  }

  // closeModal() {
  //   this.router.navigate(['.', { outlets: { ingredients: null } }], { relativeTo: this.route.parent });
  // }

  edit(recipe: Recipe) {
    this.router.navigate(['.', { outlets: { ingredient: null, ingredients: null, recipe: ['edit', recipe.id] } }], { relativeTo: this.route.parent });
  }

  editIngredient(ingredient: RecipeIngredient) {
    this.router.navigate(['.', { outlets: { recipe: null, ingredients: ['edit', ingredient.id] } }], { relativeTo: this.route.parent });
  }

}
