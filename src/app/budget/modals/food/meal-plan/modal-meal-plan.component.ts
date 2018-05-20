import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { MealPlanRecipe, MealPlan } from '../../../models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component'


@Component({
    selector: 'budget-meal-plan-modal',
    templateUrl: './modal-meal-plan.component.html',
    styleUrls: ['./modal-meal-plan.component.scss']
})
export class ModalMealPlanComponent extends ModalBaseComponent implements OnInit {

    recipes: Observable<MealPlanRecipe[]>;
    mealPlan: MealPlan;
    id: number;

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
        })
    }

    getData(): void {
        this.apiService.getMealPlan(this.id).subscribe(o => {
            this.mealPlan = o;
            this.recipes = this.apiService.getMealPlanRecipes(o.name);
        });
    }

    edit(mealPlan: MealPlan) {
        this.router.navigate(['.', { outlets: { mealPlan: ['edit', mealPlan.id] } }], { relativeTo: this.route.parent });
    }

    addRecipe(mealPlan: MealPlan) {
        this.router.navigate(['.', { outlets: { mealPlanRecipe: ['recipe', 'add', mealPlan.id] } }], { relativeTo: this.route.parent });
    }
    editRecipe(mealPlanRecipe: MealPlanRecipe) {
        this.router.navigate(['.', { outlets: { mealPlanRecipe: ['recipe', 'edit', mealPlanRecipe.id] } }], { relativeTo: this.route.parent });
    }

}
