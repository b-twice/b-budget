import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { MealPlan, MealPlanRecipe } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormMealPlanComponent } from '../../../forms/food/meal-plan/form-meal-plan.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';


@Component({
    selector: 'budget-meal-plan-recipe-add-modal',
    templateUrl: './modal-meal-plan-recipe-add.component.html',
    styleUrls: ['./modal-meal-plan-recipe-add.component.scss']
})
export class ModalMealPlanRecipeAddComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormMealPlanComponent)
    form: FormMealPlanComponent;

    id: number;
    mealPlanRecipe: MealPlanRecipe;
    loaded: boolean;
    label: string = 'Submit';


    constructor(
        public location: Location,
        public route: ActivatedRoute,
        public router: Router,
        public apiService: FoodService
    ) {
        super(location)
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getData();
        });
    }

    getData() {
        if (this.id) {
            this.apiService.getMealPlan(this.id).subscribe(mealPlan => {
                this.label = 'Add';
                this.mealPlanRecipe = new MealPlanRecipe(0, mealPlan.name, null);
            });
        }
        else {
            this.loaded = true;
        }

    }

    onSubmit(item: MealPlan) {
        this.apiService.addMealPlan(item).subscribe(result => {
            this.closeModal();
        }, error => { console.log(error); });
    }

}
