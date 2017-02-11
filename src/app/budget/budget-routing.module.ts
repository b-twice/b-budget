import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from '../login/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: 'owner/:owner/:year',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'categories',
                component: CategoriesComponent,
            },
            {
                path: 'transactions',
                component: TransactionsComponent,
            },
            {
                path: 'summary',
                component: SummaryComponent,
            },
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'full'
            }
        ]
    },
    // Don't init component, redirect to owner/All to display all in user profile
    {
        path: '',
        redirectTo: '/budget/owner/All/2016/summary'
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