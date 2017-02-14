import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';

import { BudgetService } from './budget.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { BudgetDashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PanelSummaryComponent } from './panel-summary/summary.component';
import { PanelCategoriesComponent } from './panel-categories/categories.component';
import { PanelTransactionsComponent } from './panel-transactions/transactions.component';
import { OwnerNavComponent } from './owner-nav/owner-nav.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { YearNavComponent } from './year-nav/year-nav.component';
import { PanelNavComponent } from './panel-nav/panel-nav.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule,
        SharedModule
    ],
    declarations: [
        BudgetDashboardComponent,
        PanelSummaryComponent,
        HeaderComponent,
        OwnerNavComponent,
        OwnerProfileComponent,
        PanelCategoriesComponent,
        PanelTransactionsComponent,
        YearNavComponent,
        PanelNavComponent,
        PanelComponent
    ],
    providers: [
        BudgetService
    ]
})
export class BudgetModule { }
