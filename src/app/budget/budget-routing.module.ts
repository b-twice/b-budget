import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { AuthGuard } from '../login/auth-guard.service';

//core
import { PanelChartComponent } from './panels/core/chart/panel-chart.component'

//finance
import { PanelSummaryComponent } from './panels/finance/summary/summary.component';
import { PanelCategoriesComponent } from './panels/finance/categories/categories.component';
import { PanelExpensesComponent } from './panels/finance/expenses/expenses.component';
import { ModalExpensesComponent } from './modals/finance/expenses/modal-expenses.component';
import { PanelTransactionsComponent } from './panels/finance/transactions/transactions.component';

//food
import { PanelGroceriesComponent } from './panels/food/groceries/groceries.component'
import { PanelFoodProductsComponent } from './panels/food/food-products/food-products.component'
import { PanelGroceryCartComponent } from './panels/food/grocery-cart/grocery-cart.component'
import { PanelMealPlansComponent } from './panels/food/meal-plans/meal-plans.component';
import { PanelRecipesComponent } from './panels/food/recipes/panel-recipes.component';

import { ModalRecipesComponent } from './modals/food/recipes/modal-recipes.component';
import { ModalGroceryListComponent } from './modals/food/grocery-list/modal-grocery-list.component';
import { ModalGroceriesComponent } from './modals/food/groceries/modal-groceries.component'
import { ModalGroceryEditComponent } from './modals/food/grocery-edit/modal-grocery-edit.component'
import { ModalRecipeIngredientsComponent } from './modals/food/recipe-ingredients/modal-recipe-ingredients.component';
import { ModalRecipeAddComponent } from './modals/food/recipe-add/modal-recipe-add.component';
import { ModalRecipeIngredientAddComponent } from './modals/food/recipe-ingredient-add/modal-recipe-ingredient-add.component';



//personal
import { PanelBooksComponent } from './panels/personal/books/books.component';
import { ModalBooksComponent } from './modals/personal/books/modal-books.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            // Finance
            {
                path: "summary/:user/:year",
                component: PanelSummaryComponent
            },
            {
                path: "categories/:user/:year",
                component: PanelCategoriesComponent
            },
            {
                path: "expenses/:user/:year",
                component: PanelExpensesComponent,
                children: [
                    {
                        path: ':category',
                        component: ModalExpensesComponent,
                        outlet: 'transactions'
                    },
                    {
                        path: ':category/:month',
                        component: ModalExpensesComponent,
                        outlet: 'transactionsByMonth'
                    }
                ]
            },
            {
                path: "transactions/:user/:year",
                component: PanelTransactionsComponent
            },



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
                        path: ':name',
                        component: ModalRecipesComponent,
                        outlet: 'recipes'
                    },
                    {
                        path: ':name',
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
                path: "recipes/:user/:year",
                component: PanelRecipesComponent,
                children: [
                    {
                        path: ':add',
                        component: ModalRecipeIngredientAddComponent,
                        outlet: 'ingredient'
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

            // personal
            {
                path: "books/:user/:year",
                component: PanelBooksComponent,
                children: [
                    {
                        path: ':name',
                        component: ModalBooksComponent,
                        outlet: 'author'
                    }
                ]
            },


            {
                path: '',
                redirectTo: '/budget/summary/All/2018'
            }
        ],

    },
    // Don't init component, redirect to user/All to display all in user profile
    {
        path: '',
        redirectTo: '/budget/summary/All/2018'
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BudgetRoutingModule { }