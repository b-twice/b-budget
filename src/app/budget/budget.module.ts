import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';

import { BudgetService } from './budget.service';

import { BudgetDashboardComponent } from './dashboard.component';
import { BudgetSummaryComponent } from './summary/budget-summary.component';
import { BudgetHeaderComponent } from './header/budget-header.component';

@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule
    ],
    declarations: [
        BudgetDashboardComponent,
        BudgetSummaryComponent,
        BudgetHeaderComponent
    ],
    providers: [
        BudgetService
    ]
})
export class BudgetModule { }
