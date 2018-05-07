import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';

// services
import { CoreService } from './services/core.service';
import { FinanceService } from './services/finance.service';


// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { FinanceRoutingModule } from './finance-routing.module'

// components
import { PanelSummaryComponent } from './panels/finance/summary/summary.component';
import { PanelCategoriesComponent } from './panels/finance/categories/categories.component';
import { PanelTransactionsComponent } from './panels/finance/transactions/transactions.component';
import { PanelExpensesComponent } from './panels/finance/expenses/expenses.component';
import { CategoriesTransformPipe } from './panels/finance/categories/categories-transform.pipe';
import { PanelSpendingChartComponent } from './panels/finance/spending-chart/spending-chart.component';
import { ModalExpensesComponent } from './modals/finance/expenses/modal-expenses.component';
import { PanelSummaryChartComponent } from './panels/finance/summary-chart/summary-chart.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        FinanceRoutingModule
    ],
    declarations: [
        PanelSummaryComponent,
        PanelCategoriesComponent,
        PanelTransactionsComponent,
        PanelExpensesComponent,
        CategoriesTransformPipe,
        PanelSummaryChartComponent,
        PanelSpendingChartComponent,
        ModalExpensesComponent,
    ],
    providers: [
        CoreService,
        FinanceService,
        DatePipe
    ]
})
export class FinanceModule { }
