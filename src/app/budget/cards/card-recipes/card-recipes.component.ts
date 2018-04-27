import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Recipe, MealPlan } from '../../models';

@Component({
    selector: 'budget-recipes-card',
    templateUrl: './card-recipes.component.html',
    styleUrls: ['./card-recipes.component.scss']
})
export class CardRecipesComponent implements OnInit {

    @Input() recipes: Observable<Recipe[]>;
    @Input() mealPlan: MealPlan;
    @Output() onModalClose = new EventEmitter();
    sortProperty: string;
    sortDesc: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    closeModal() {
        this.onModalClose.emit();
    }

    stopPropogation(event): void { event.stopPropagation(); }

    sort(sortProperty: string) {
        if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
        else this.sortDesc = false;
        this.sortProperty = sortProperty;
    }

}
