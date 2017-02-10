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
        children: [
            {
                path: 'owner/:name',
                component: BudgetDashboardComponent,
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: 'year/:year',
                        component: BudgetSummaryComponent,
                        canActivateChild: [AuthGuard],
                    },
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