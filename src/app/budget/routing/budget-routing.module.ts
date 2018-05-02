import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from '../dashboard.component';
import { AuthGuard } from '../../login/auth-guard.service';

import { CardGroceriesComponent } from '../cards/card-groceries/card-groceries.component'
import { CardGroceryEditComponent } from '../cards/card-grocery-edit/card-grocery-edit.component'
import { PanelGroceriesComponent } from '../panels/panel-groceries/groceries.component'
import { PanelChartComponent } from '../panels/panel-chart/panel-chart.component'
import { PanelFoodProductsComponent } from '../panels/panel-food-products/food-products.component'
import { PanelGroceryCartComponent } from '../panels/panel-grocery-cart/grocery-cart.component'
import { CardRecipesComponent } from '../cards/card-recipes/card-recipes.component';
import { CardGroceryListComponent } from '../cards/card-grocery-list/card-grocery-list.component';
import { PanelComponent } from '../panel/panel.component';
import { PanelMealPlansComponent } from '../panels/panel-meal-plans/meal-plans.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
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
                path: '',
                redirectTo: '/budget/user/All/2018/summary'
            }
        ],

    },
    // Don't init component, redirect to user/All to display all in user profile
    {
        path: '',
        redirectTo: '/budget/user/All/2018/summary'
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