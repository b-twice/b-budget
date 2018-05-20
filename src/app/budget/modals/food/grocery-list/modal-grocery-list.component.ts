import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { MealPlanRecipe, MealPlanGrocery, MealPlan } from '../../../models/food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component'


@Component({
    selector: 'budget-grocery-list-modal',
    templateUrl: './modal-grocery-list.component.html',
    styleUrls: ['./modal-grocery-list.component.scss']
})
export class ModalGroceryListComponent extends ModalBaseComponent implements OnInit {

    mealPlan: MealPlan;
    recipes: Observable<MealPlanRecipe[]>;
    id: number;
    groceriesByCategory: { [key: string]: MealPlanGrocery[] } = {};

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public location: Location
    ) {
        super(location);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getData();
        })
    }

    getData() {
        this.apiService.getMealPlan(this.id).subscribe(o => {
            this.mealPlan = o;
            this.recipes = this.apiService.getMealPlanRecipes(o.name);
            this.apiService.getMealPlanGroceries(o.name).subscribe(
                g => this.groceriesByCategory = this.categorizeGroceries(g)
            );
        });
    }

    categorizeGroceries(groceries: MealPlanGrocery[]): { [key: string]: MealPlanGrocery[] } {
        let data = {};
        if (!groceries) {
            return data;
        }
        groceries.forEach(g => {
            let category = g.category.replace(" ", "_")
            if (!data.hasOwnProperty(category)) {
                data[category] = [];
            }
            data[category].push(g);
        });
        return data;
    }
}
