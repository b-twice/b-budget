import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';

import { BudgetService } from './budget.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { BudgetDashboardComponent } from './dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { OwnerNavComponent } from './owner-nav/owner-nav.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { YearNavComponent } from './year-nav/year-nav.component';

@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule,
        SharedModule
    ],
    declarations: [
        BudgetDashboardComponent,
        SummaryComponent,
        HeaderComponent,
        OwnerNavComponent,
        OwnerProfileComponent,
        CategoriesComponent,
        TransactionsComponent,
        YearNavComponent
    ],
    providers: [
        BudgetService
    ]
})
export class BudgetModule { }
