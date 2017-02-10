import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';

import { BudgetService } from './budget.service';

import { BudgetDashboardComponent } from './dashboard.component';
import { BudgetSummaryComponent } from './summary/budget-summary.component';
import { BudgetHeaderComponent } from './header/budget-header.component';

//shared
import { SharedModule } from '../shared/shared.module';
import { OwnerNavComponent } from './owner-nav/owner-nav.component';

@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule,
        SharedModule
    ],
    declarations: [
        BudgetDashboardComponent,
        BudgetSummaryComponent,
        BudgetHeaderComponent,
        OwnerNavComponent
    ],
    providers: [
        BudgetService
    ]
})
export class BudgetModule { }
