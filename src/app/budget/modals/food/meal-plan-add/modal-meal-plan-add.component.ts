import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { MealPlan } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormMealPlanComponent } from '../../../forms/food/meal-plan/form-meal-plan.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';
import { AppService } from '../../../services/app.service';


@Component({
    selector: 'budget-meal-plan-add-modal',
    templateUrl: './modal-meal-plan-add.component.html',
    styleUrls: ['./modal-meal-plan-add.component.scss']
})
export class ModalMealPlanAddComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormMealPlanComponent)
    form: FormMealPlanComponent;

    id: number;
    user: string;
    mealPlan: MealPlan;
    loaded: boolean;
    label: string = 'Submit';


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
        this.route.parent.params.subscribe(params => {
            this.user = params['user'];
        });
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getData();
        });
    }

    getData() {
        if (this.id) {
            this.apiService.getMealPlan(this.id).subscribe(mealPlan => {
                this.label = 'Update';
                this.mealPlan = mealPlan;
            });
        }
        else {
            this.loaded = true;
        }

    }

    onSubmit(item: MealPlan) {
        if (this.mealPlan) {
            this.apiService.updateMealPlan(item.id, item).subscribe(result => {
                this.appService.edit<MealPlan>(item);
                this.closeModal();
            }, error => { this.form.throwError(error); });
        }
        else {
            this.apiService.addMealPlan(item).subscribe(result => {
                this.appService.edit<MealPlan>(item);
                this.closeModal();
            }, error => { this.form.throwError(error); });
        }
    }
    onDelete(item: MealPlan) {
        this.apiService.deleteMealPlan(item.id).subscribe(result => {
            this.appService.edit<MealPlan>(item);
            this.router.navigate(['.', { outlets: { mealPlan: null } }], { relativeTo: this.route.parent });
        }, error => this.form.throwError(error));
    }



}
