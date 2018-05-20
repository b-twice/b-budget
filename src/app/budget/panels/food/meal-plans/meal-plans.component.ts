import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { MealPlan, MealPlanRecipe, MealPlanGrocery } from '../../../models/food';
import { NavigationService } from '../../../services/navigation.service';
import { Observable } from 'rxjs/Observable';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
    selector: 'budget-panel-meal-plans',
    templateUrl: './meal-plans.component.html',
    styleUrls: ['./meal-plans.component.scss']
})
export class PanelMealPlansComponent extends PanelBaseComponent implements OnInit {

    mealPlans: Observable<MealPlan[]>;
    mealPlansTotal: number = 0;
    mealPlanRecipes: Observable<MealPlanRecipe[]>;
    selectedMealPlan: MealPlan;
    mealPlanGroceries: Observable<MealPlanGrocery[]>;
    showRecipeList: boolean;
    showGroceryList: boolean;

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public navigationService: NavigationService,
        public datePipe: DatePipe
    ) {
        super(route, navigationService);
    }

    ngOnInit() {
        this.resolveRoutes();
    }

    getData(): void {
        this.mealPlans = this.apiService.getMealPlans(this.user);
    }

    printGroceryList(mealPlan: MealPlan): void {
        this.mealPlanRecipes = this.apiService.getMealPlanRecipes(mealPlan.name);
        this.mealPlanGroceries = this.apiService.getMealPlanGroceries(mealPlan.name);
        this.selectedMealPlan = mealPlan;
        this.showGroceryList = true;
    }

}



