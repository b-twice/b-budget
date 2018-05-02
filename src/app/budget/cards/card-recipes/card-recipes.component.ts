import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Recipe, MealPlan } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';


@Component({
    selector: 'budget-recipes-card',
    templateUrl: './card-recipes.component.html',
    styleUrls: ['./card-recipes.component.scss']
})
export class CardRecipesComponent implements OnInit {

    recipes: Observable<Recipe[]>;
    mealPlan: Observable<MealPlan>;
    sortProperty: string;
    sortDesc: boolean = false;
    mealPlanName: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public apiService: FoodService
    ) { }

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

    closeModal() {
        this.router.navigate(['.', { outlets: { recipes: null } }], { relativeTo: this.route.parent });
    }

    stopPropogation(event): void { event.stopPropagation(); }

    sort(sortProperty: string) {
        if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
        else this.sortDesc = false;
        this.sortProperty = sortProperty;
    }

}
