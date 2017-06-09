import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserRecipeIngredient, UserRecipe } from '../models';

@Component({
  selector: 'budget-recipe-ingredients',
  templateUrl: './card-recipe-ingredients.component.html',
  styleUrls: ['./card-recipe-ingredients.component.scss']
})
export class CardRecipeIngredientsComponent implements OnInit {

  @Input() ingredients: UserRecipeIngredient[];
  @Input() recipe: UserRecipe;
  @Output() onRecipeClose = new EventEmitter();
  recipeTotal: number = 0;
  recipeOrganicTotal: number = 0;
  recipeSeasonalTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor() { }

  ngOnInit() {
    this.ingredients.forEach(i => {
      this.recipeTotal += i.cost;
      this.recipeOrganicTotal += i.costOrganic;
      this.recipeSeasonalTotal += i.costSeasonal;
    });

  }

  closeRecipe() {
    this.onRecipeClose.emit();
  }

  stopPropogation(event): void { event.stopPropagation(); }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }


}
