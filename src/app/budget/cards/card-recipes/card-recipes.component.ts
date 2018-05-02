import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Recipe, MealPlan } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { CardBaseComponent } from '../card-base/card-base.component'


@Component({
    selector: 'budget-recipes-card',
    templateUrl: './card-recipes.component.html',
    styleUrls: ['./card-recipes.component.scss']
})
export class CardRecipesComponent extends CardBaseComponent implements OnInit {

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
