import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Recipe, MealPlan, Grocery } from '../../models';

@Component({
    selector: 'budget-grocery-list-card',
    templateUrl: './card-grocery-list.component.html',
    styleUrls: ['./card-grocery-list.component.scss']
})
export class CardGroceryListComponent implements OnInit {

    @Input() recipes: Recipe[];
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
