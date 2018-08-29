import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { MealPlan, MealPlanRecipe } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormMealPlanRecipeComponent } from '../../../forms/food/meal-plan-recipe/form-meal-plan-recipe.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';
import { AppService } from '../../../services/app.service';


@Component({
    selector: 'budget-meal-plan-recipe-add-modal',
    templateUrl: './modal-meal-plan-recipe-add.component.html',
    styleUrls: ['./modal-meal-plan-recipe-add.component.scss']
})
export class ModalMealPlanRecipeAddComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormMealPlanRecipeComponent)
    form: FormMealPlanRecipeComponent;

    id: number;
    mealPlanRecipe: MealPlanRecipe;
    label: string = 'Add';


    constructor(
        public location: Location,
        public route: ActivatedRoute,
        public router: Router,
        public apiService: FoodService,
        public appService: AppService
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
        this.apiService.getMealPlan(this.id).subscribe(mealPlan => {
            this.mealPlanRecipe = new MealPlanRecipe(0, 0, mealPlan.name, 0, null, null, null);
        });

    }

    onSubmit(item: MealPlanRecipe) {
        console.log(item)
        this.apiService.addMealPlanRecipe(item).subscribe(result => {
            this.appService.edit<MealPlanRecipe>(item);
            this.closeModal();
        }, error => { this.form.throwError(error); });
    }

}
