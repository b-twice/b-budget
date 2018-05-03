import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { AuthGuard } from '../login/auth-guard.service';

const adminRoutes: Routes = [
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

            // {
            //     path: '',
            //     redirectTo: '/budget/finance/summary/All/2018'
            // }
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
