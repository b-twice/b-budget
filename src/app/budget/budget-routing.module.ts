import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from '../login/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'owner/:owner/:year',
                component: SummaryComponent,
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
                ]
            },
            // Don't init component, redirect to owner/All to display all in user profile
            {
                path: '',
                redirectTo: '/budget/owner/All/2016'
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