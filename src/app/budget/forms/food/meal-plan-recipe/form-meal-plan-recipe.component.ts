import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';
import { FoodService } from '../../../services/food.service';
import { MealPlanRecipe } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormBaseComponent } from '../../core/base/form-base.component';

@Component({
    selector: 'budget-form-meal-plan-recipe',
    templateUrl: './form-meal-plan-recipe.component.html',
    styleUrls: ['./form-meal-plan-recipe.component.scss']
})
export class FormMealPlanRecipeComponent extends FormBaseComponent implements OnInit {

    @Input() mealPlanRecipe: MealPlanRecipe;

    model: MealPlanRecipe = new MealPlanRecipe(0, null, null);
    @Output() onSubmit = new EventEmitter<MealPlanRecipe>();
    @Output() onDelete = new EventEmitter<MealPlanRecipe>();

    recipeService: CompleterData;

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public completerService: CompleterService
    ) {
        super(route)
    }

    ngOnInit() {
        forkJoin(
            this.apiService.getRecipesAll()
        ).subscribe(data => {
            this.recipeService = this.completerService.local(data[1], 'name', 'name');
            if (this.mealPlanRecipe) {
                this.model = this.mealPlanRecipe;
            }
        });
    }
}

