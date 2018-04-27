import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { MealPlan, Recipe, MealPlanGrocery } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'budget-panel-meal-plans',
    templateUrl: './meal-plans.component.html',
    styleUrls: ['./meal-plans.component.scss']
})
export class PanelMealPlansComponent implements OnInit {

    mealPlans: Observable<MealPlan[]>;
    mealPlansTotal: number = 0;
    sortProperty: string;
    sortDesc: boolean = false;
    user: string;
    mealPlanRecipes: Observable<Recipe[]>;
    selectedMealPlan: MealPlan;
    mealPlanGroceries: Observable<MealPlanGrocery[]>;
    showRecipeList: boolean;
    showGroceryList: boolean;

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public datePipe: DatePipe) { }

    ngOnInit() {
        this.route.parent.params.subscribe(
            params => {
                this.user = params['user'];
                this.getMealPlans();
            }
        )
    }

    getMealPlans(): void {
        if (!this.user) { return; }
        this.mealPlans = this.apiService.getMealPlans(this.user);
    }

    getMealPlanRecipes(mealPlan: MealPlan): void {
        this.mealPlanRecipes = this.apiService.getMealPlanRecipes(mealPlan.name);
        this.selectedMealPlan = mealPlan;
        this.showRecipeList = true;
    }

    modalClose() {
        this.mealPlanRecipes = null;
        this.selectedMealPlan = null;
        this.mealPlanGroceries = null;
        this.showGroceryList = false;
        this.showRecipeList = false;
    }

    printGroceryList(mealPlan: MealPlan): void {
        this.mealPlanRecipes = this.apiService.getMealPlanRecipes(mealPlan.name);
        this.mealPlanGroceries = this.apiService.getMealPlanGroceries(mealPlan.name);
        this.selectedMealPlan = mealPlan;
        this.showGroceryList = true;
    }

    sort(sortProperty: string) {
        if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
        else this.sortDesc = false;
        this.sortProperty = sortProperty;
    }

}



