import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { MealPlan } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormBaseComponent } from '../../core/base/form-base.component';

@Component({
    selector: 'budget-form-meal-plan',
    templateUrl: './form-meal-plan.component.html',
    styleUrls: ['./form-meal-plan.component.scss']
})
export class FormMealPlanComponent extends FormBaseComponent implements OnInit {

    @Input() mealPlan: MealPlan;
    @Input() user: string;

    model: MealPlan = new MealPlan(0, null, null, null);
    @Output() onSubmit = new EventEmitter<MealPlan>();
    @Output() onDelete = new EventEmitter<MealPlan>();

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService
    ) {
        super(route)
    }

    ngOnInit() {
        if (this.mealPlan) {
            this.model = this.mealPlan
        }

    }

    beforeSubmit() {
        this.model.user = this.model.user ? this.model.user : this.user;
    }

}

