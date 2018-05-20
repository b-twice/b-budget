import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { MealPlanRecipe } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormMealPlanRecipeComponent } from '../../../forms/food/meal-plan-recipe/form-meal-plan-recipe.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';


@Component({
    selector: 'budget-meal-plan-recipe-edit-modal',
    templateUrl: './modal-meal-plan-recipe-edit.component.html',
    styleUrls: ['./modal-meal-plan-recipe-edit.component.scss']
})
export class ModalMealPlanRecipeEditComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormMealPlanRecipeComponent)
    form: FormMealPlanRecipeComponent;

    id: number;
    mealPlanRecipe: MealPlanRecipe;
    label: string = 'Update';


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
        this.apiService.getMealPlanRecipe(this.id).subscribe(mealPlanRecipe => {
            this.mealPlanRecipe = mealPlanRecipe;
        });

    }

    onSubmit(item: MealPlanRecipe) {
        this.apiService.updateMealPlanRecipe(item.id, item).subscribe(result => {
            this.closeModal();
        }, error => { console.log(error); });
    }
    onDelete(item: MealPlanRecipe) {
        this.apiService.deleteMealPlanRecipe(item.id).subscribe(result => {
            this.closeModal();
        }, error => { console.log(error); });
    }

}
