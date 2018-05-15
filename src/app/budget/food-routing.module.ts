import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardPanelComponent } from './base/dashboard-panel/dashboard-panel.component';

//food
import { PanelGroceriesComponent } from './panels/food/groceries/groceries.component'
import { PanelFoodProductsComponent } from './panels/food/food-products/food-products.component'
import { PanelGroceryCartComponent } from './panels/food/grocery-cart/grocery-cart.component'
import { PanelMealPlansComponent } from './panels/food/meal-plans/meal-plans.component';
import { PanelRecipesComponent } from './panels/food/recipes/panel-recipes.component';
import { PanelIngredientsComponent } from './panels/food/ingredients/panel-ingredients.component'

import { ModalMealPlanComponent } from './modals/food/meal-plan/modal-meal-plan.component';
import { ModalMealPlanAddComponent } from './modals/food/meal-plan-add/modal-meal-plan-add.component';
import { ModalGroceryListComponent } from './modals/food/grocery-list/modal-grocery-list.component';
import { ModalGroceriesComponent } from './modals/food/groceries/modal-groceries.component'
import { ModalGroceryEditComponent } from './modals/food/grocery-edit/modal-grocery-edit.component'
import { ModalRecipeIngredientsComponent } from './modals/food/recipe-ingredients/modal-recipe-ingredients.component';
import { ModalRecipeAddComponent } from './modals/food/recipe-add/modal-recipe-add.component';
import { ModalRecipeIngredientAddComponent } from './modals/food/recipe-ingredient-add/modal-recipe-ingredient-add.component';

const foodRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardPanelComponent,
        children: [
            // Food
            {
                path: 'groceryCart/:user/:year',
                component: PanelGroceryCartComponent
            },
            {
                path: "groceries/:user/:year",
                component: PanelGroceriesComponent,
                children: [
                    {
                        path: ':name',
                        component: ModalGroceriesComponent,
                        outlet: 'list'
                    },
                    {
                        path: ':id',
                        component: ModalGroceryEditComponent,
                        outlet: 'form'
                    }
                ]
            },
            {
                path: "mealPlans/:user/:year",
                component: PanelMealPlansComponent,
                children: [
                    {
                        path: 'add',
                        component: ModalMealPlanAddComponent,
                        outlet: 'mealPlan'
                    },
                    {
                        path: 'edit/:id',
                        component: ModalMealPlanAddComponent,
                        outlet: 'mealPlan'
                    },
                    {
                        path: ':id',
                        component: ModalMealPlanComponent,
                        outlet: 'mealPlan'
                    },
                    {
                        path: ':id',
                        component: ModalGroceryListComponent,
                        outlet: 'groceryList'
                    }
                ]
            },
            {
                path: "foodProducts/:user/:year",
                component: PanelFoodProductsComponent,
                children: [
                    {
                        path: ':name',
                        component: ModalGroceriesComponent,
                        outlet: 'list'
                    },
                    {
                        path: ':id',
                        component: ModalGroceryEditComponent,
                        outlet: 'form'
                    }
                ]
            },
            {
                path: "ingredients/:user/:year",
                component: PanelIngredientsComponent,
            },
            {
                path: "recipes/:user/:year",
                component: PanelRecipesComponent,
                children: [
                    {
                        path: 'add',
                        component: ModalRecipeIngredientAddComponent,
                        outlet: 'ingredients'
                    },
                    {
                        path: 'edit/:id',
                        component: ModalRecipeIngredientAddComponent,
                        outlet: 'ingredients'
                    },
                    {
                        path: ':id',
                        component: ModalRecipeIngredientsComponent,
                        outlet: 'ingredients'
                    },
                    {
                        path: 'add',
                        component: ModalRecipeAddComponent,
                        outlet: 'recipe'
                    },
                    {
                        path: 'edit/:id',
                        component: ModalRecipeAddComponent,
                        outlet: 'recipe'
                    }

                ]
            },

            // Don't init component, redirect to user/All to display all in user profile
            {
                path: '',
                redirectTo: '/budget/food/groceries/All/2018'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(foodRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FoodRoutingModule { }
