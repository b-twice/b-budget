import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserRecipeIngredient } from '../models';

@Component({
  selector: 'budget-recipe-ingredients',
  templateUrl: './card-recipe-ingredients.component.html',
  styleUrls: ['./card-recipe-ingredients.component.scss']
})
export class CardRecipeIngredientsComponent implements OnInit {

  @Input() ingredients: Observable<UserRecipeIngredient[]>;
  @Input() recipe: string;
  @Output() onRecipeClose = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  closeRecipe() {
    this.onRecipeClose.emit();
  }

  stopPropogation(event): void { event.stopPropagation(); }
}
