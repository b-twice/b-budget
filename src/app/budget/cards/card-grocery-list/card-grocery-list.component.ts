import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Recipe, MealPlan, MealPlanRecipeIngredient } from '../../models';

@Component({
    selector: 'budget-grocery-list-card',
    templateUrl: './card-grocery-list.component.html',
    styleUrls: ['./card-grocery-list.component.scss']
})
export class CardGroceryListComponent implements OnInit {

    @Input() recipes: Recipe[];
    @Input() mealPlan: MealPlan;
    @Input() ingredients: MealPlanRecipeIngredient[];
    @Output() onModalClose = new EventEmitter();
    sortProperty: string;
    sortDesc: boolean = false;
    ingredientsByCategory: { [key: string]: MealPlanRecipeIngredient[] } = {};

    constructor() { }

    ngOnInit() {
        this.ingredientsByCategory = this.categorizeIngredients();
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

    categorizeIngredients(): { [key: string]: MealPlanRecipeIngredient[] } {
        let data = {}
        console.log(this.ingredients)
        this.ingredients.forEach(i => {
            let category = i.category.replace(" ", "_")
            if (!(category in this.ingredientsByCategory)) {
                data[category] = [];
            }
            data[category].push(i);
        });
        console.log(data)
        return data;
    }
}
