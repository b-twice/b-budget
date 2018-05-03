import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Recipe, MealPlan } from '../../../models/food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component'


@Component({
    selector: 'budget-recipes-modal',
    templateUrl: './modal-recipes.component.html',
    styleUrls: ['./modal-recipes.component.scss']
})
export class ModalRecipesComponent extends ModalBaseComponent implements OnInit {

    recipes: Observable<Recipe[]>;
    mealPlan: Observable<MealPlan>;
    mealPlanName: string;

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public location: Location
    ) {
        super(location)
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.mealPlanName = params['name'];
            this.getData();
        })
    }

    getData(): void {
        this.mealPlan = this.apiService.getMealPlan(this.mealPlanName);
        this.recipes = this.apiService.getMealPlanRecipes(this.mealPlanName);
    }

}
