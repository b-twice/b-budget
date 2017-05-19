import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardComponent } from '../dashboard.component';
import { PanelComponent } from '../panel/panel.component';
import { AuthGuard } from '../../login/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: 'user/:user/:year',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: ":panel",
                component: PanelComponent
            },
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'full'
            }
        ]
    },
    // Don't init component, redirect to user/All to display all in user profile
    {
        path: '',
        redirectTo: '/budget/user/All/2017/summary'
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