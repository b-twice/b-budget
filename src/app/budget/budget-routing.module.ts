import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from './dashboard.component';
import { BudgetSummaryComponent } from './summary/budget-summary.component';

import { AuthGuard } from '../login/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: BudgetSummaryComponent
            },
            {
                path: 'owner/:name',
                component: BudgetSummaryComponent,
                children: [
                    {
                        path: 'year/:year',
                        component: BudgetSummaryComponent,
                    },
                ]
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