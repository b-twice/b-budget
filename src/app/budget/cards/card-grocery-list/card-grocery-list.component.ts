import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Recipe, MealPlan, MealPlanGrocery } from '../../models';

@Component({
    selector: 'budget-grocery-list-card',
    templateUrl: './card-grocery-list.component.html',
    styleUrls: ['./card-grocery-list.component.scss']
})
export class CardGroceryListComponent implements OnInit {

    @Input() recipes: Observable<Recipe[]>;
    @Input() mealPlan: MealPlan;
    @Input() groceries: Observable<MealPlanGrocery[]>;
    @Output() onModalClose = new EventEmitter();
    sortProperty: string;
    sortDesc: boolean = false;
    groceriesByCategory: { [key: string]: MealPlanGrocery[] } = {};

    constructor() { }

    ngOnInit() {
        this.groceries.subscribe(g => this.groceriesByCategory = this.categorizeGroceries(g))
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

    categorizeGroceries(groceries: MealPlanGrocery[]): { [key: string]: MealPlanGrocery[] } {
        let data = {};
        if (!groceries) {
            return data;
        }
        groceries.forEach(g => {
            let category = g.category.replace(" ", "_")
            if (!data.hasOwnProperty(category)) {
                console.log(category)
                data[category] = [];
            }
            data[category].push(g);
        });
        return data;
    }
}
