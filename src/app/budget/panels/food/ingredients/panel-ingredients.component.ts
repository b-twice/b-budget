import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../../../services/food.service';
import { RecipeIngredient, Recipe } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormRecipeIngredientComponent } from '../../../forms/food/recipe-ingredient/form-recipe-ingredient.component';
import { NavigationService } from '../../../services/navigation.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
  selector: 'budget-panel-ingredients',
  templateUrl: './panel-ingredients.component.html',
  styleUrls: ['./panel-ingredients.component.scss']
})
export class PanelIngredientsComponent extends PanelBaseComponent implements OnInit {

  ingredients: RecipeIngredient[];
  saveError: boolean = false;

  @ViewChild(FormRecipeIngredientComponent)
  recipeIngredientForm: FormRecipeIngredientComponent;


  constructor(
    public route: ActivatedRoute,
    public location: Location,
    public apiService: FoodService,
    public navigationService: NavigationService
  ) {
    super(route, navigationService);
  }

  ngOnInit() {
    this.ingredients = [];
    this.resolveRoutes();
  }

  back() {
    this.location.back();
  }
  onSubmit(item: RecipeIngredient) {
    this.ingredients.push(item);
    this.recipeIngredientForm.rebuild();
  }

  removeItem(index: number): void {
    this.ingredients.splice(index, 1);
  }

  checkout(): void {
    this.saveError = false;
    let data = { ingredients: this.ingredients }
    this.apiService.postIngredients(data).subscribe(result => {
      this.ingredients = [];
    }, error => { console.log(error); this.saveError = true });
  }

}

