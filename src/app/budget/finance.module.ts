import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// services
import { CoreService } from './services/core.service';
import { NavigationService } from './services/navigation.service';
import { FinanceService } from './services/finance.service';


// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './services/auth.module';

// components
import { PanelSummaryComponent } from './panels/finance/summary/summary.component';
import { PanelCategoriesComponent } from './panels/finance/categories/categories.component';
import { PanelTransactionsComponent } from './panels/finance/transactions/transactions.component';
import { PanelExpensesComponent } from './panels/finance/expenses/expenses.component';
import { UserProfileComponent } from './base/user-profile/user-profile.component';
import { UserProfileTransformPipe } from './base/user-profile/user-profile-transform.pipe';
import { CategoriesTransformPipe } from './panels/finance/categories/categories-transform.pipe';
import { PanelSpendingChartComponent } from './panels/finance/spending-chart/spending-chart.component';
import { ModalExpensesComponent } from './modals/finance/expenses/modal-expenses.component';
import { PanelSummaryChartComponent } from './panels/finance/summary-chart/summary-chart.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthModule,
        CoreModule,
        RouterModule
    ],
    declarations: [
        PanelSummaryComponent,
        UserProfileComponent,
        PanelCategoriesComponent,
        PanelTransactionsComponent,
        PanelExpensesComponent,
        UserProfileTransformPipe,
        CategoriesTransformPipe,
        PanelSummaryChartComponent,
        PanelSpendingChartComponent,
        ModalExpensesComponent,
    ],
    exports: [
        UserProfileComponent
    ],
    providers: [
        CoreService,
        FinanceService,
        NavigationService,
        DatePipe
    ]
})
export class FinanceModule { }
