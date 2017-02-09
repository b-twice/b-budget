import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { BudgetSummaryComponent } from './summary/budget-summary.component';

import { AuthGuard } from '../login/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: '',
        // redirectTo: '/budget/summary',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: BudgetSummaryComponent,
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'summary/:name', component: BudgetSummaryComponent },
                    { path: 'summary', component: BudgetSummaryComponent }
                ]
            },
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