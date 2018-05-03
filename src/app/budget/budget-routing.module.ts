import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { AuthGuard } from '../login/auth-guard.service';

import { CardGroceriesComponent } from './cards/card-groceries/card-groceries.component'
import { CardGroceryEditComponent } from './cards/card-grocery-edit/card-grocery-edit.component'
import { PanelGroceriesComponent } from './panels/panel-groceries/groceries.component'
import { PanelChartComponent } from './panels/panel-chart/panel-chart.component'
import { PanelFoodProductsComponent } from './panels/panel-food-products/food-products.component'
import { PanelGroceryCartComponent } from './panels/panel-grocery-cart/grocery-cart.component'
import { CardRecipesComponent } from './cards/card-recipes/card-recipes.component';
import { CardGroceryListComponent } from './cards/card-grocery-list/card-grocery-list.component';
import { PanelMealPlansComponent } from './panels/panel-meal-plans/meal-plans.component';
import { PanelRecipesComponent } from './panels/panel-recipes/panel-recipes.component';
import { CardRecipeIngredientsComponent } from './cards/card-recipe-ingredients/card-recipe-ingredients.component';
import { PanelBooksComponent } from './panels/panel-books/books.component';
import { CardBooksComponent } from './cards/card-books/card-books.component';
import { PanelSummaryComponent } from './panels/panel-summary/summary.component';
import { PanelCategoriesComponent } from './panels/panel-categories/categories.component';
import { PanelExpensesComponent } from './panels/panel-expenses/expenses.component';
import { CardExpensesComponent } from './cards/card-expenses/card-expenses.component';
import { PanelTransactionsComponent } from './panels/panel-transactions/transactions.component';

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
                        component: CardExpensesComponent,
                        outlet: 'transactions'
                    },
                    {
                        path: ':category/:month',
                        component: CardExpensesComponent,
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
                        component: CardGroceriesComponent,
                        outlet: 'list'
                    },
                    {
                        path: ':id',
                        component: CardGroceryEditComponent,
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
                        component: CardRecipesComponent,
                        outlet: 'recipes'
                    },
                    {
                        path: ':name',
                        component: CardGroceryListComponent,
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
                        component: CardGroceriesComponent,
                        outlet: 'list'
                    },
                    {
                        path: ':id',
                        component: CardGroceryEditComponent,
                        outlet: 'form'
                    }
                ]
            },
            {
                path: "recipes/:user/:year",
                component: PanelRecipesComponent,
                children: [
                    {
                        path: ':name',
                        component: CardRecipeIngredientsComponent,
                        outlet: 'ingredients'
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
                        component: CardBooksComponent,
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