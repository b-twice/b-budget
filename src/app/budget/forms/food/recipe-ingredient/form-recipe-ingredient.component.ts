import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Recipe, RecipeIngredient } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormBaseComponent } from '../../core/base/form-base.component';

@Component({
    selector: 'budget-form-recipe-ingredient',
    templateUrl: './form-recipe-ingredient.component.html',
    styleUrls: ['./form-recipe-ingredient.component.scss']
})
export class FormRecipeIngredientComponent extends FormBaseComponent implements OnInit {

    @Input() recipeIngredient: RecipeIngredient;
    @Input() user: string;

    model: RecipeIngredient = new RecipeIngredient(0, null, null, null, null);
    recipes: Observable<Recipe[]>;
    recipeService: CompleterData;
    @Output() onSubmit = new EventEmitter<RecipeIngredient>();
    @Output() onDelete = new EventEmitter<RecipeIngredient>();

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public completerService: CompleterService
    ) {
        super(route)
    }

    ngOnInit() {
        this.apiService.getRecipesAll().subscribe(data => {
            this.recipeService = this.completerService.local(data, 'name', 'name');
            if (this.recipeIngredient) {
                this.model = this.recipeIngredient;
            }
        })
    }

}
