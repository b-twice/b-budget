import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './base/dashboard/dashboard.component';
import { AuthGuard } from '../login/auth-guard.service';

import { ModalGroceryListComponent } from './base/grocery-list/modal-grocery-list.component';

const adminRoutes: Routes = [
    {
        path: 'groceryList/:id',
        component: ModalGroceryListComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: '',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'finance',
                loadChildren: 'app/budget/finance.module#FinanceModule',
            },
            {
                path: 'food',
                loadChildren: 'app/budget/food.module#FoodModule',
            },
            {
                path: 'personal',
                loadChildren: 'app/budget/personal.module#PersonalModule',
            },
            {
                path: '',
                redirectTo: '/budget/finance/summary/All/2019'
            }
        ]
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
