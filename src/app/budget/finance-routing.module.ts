import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardPanelComponent } from './base/dashboard-panel/dashboard-panel.component';

//finance
import { PanelSummaryComponent } from './panels/finance/summary/summary.component';
import { PanelCategoriesComponent } from './panels/finance/categories/categories.component';
import { PanelExpensesComponent } from './panels/finance/expenses/expenses.component';
import { ModalExpensesComponent } from './modals/finance/expenses/modal-expenses.component';
import { PanelTransactionsComponent } from './panels/finance/transactions/transactions.component';

const financeRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardPanelComponent,
        children: [
            // Finance
            {
                path: "summary/:user/:year",
                component: PanelSummaryComponent
            },
            {
                path: "categories/:user/:year",
                component: PanelCategoriesComponent
            },
            {
                path: "expenses/:user/:year",
                component: PanelExpensesComponent,
                children: [
                    {
                        path: ':category',
                        component: ModalExpensesComponent,
                        outlet: 'transactions'
                    },
                    {
                        path: ':category/:month',
                        component: ModalExpensesComponent,
                        outlet: 'transactionsByMonth'
                    }
                ]
            },
            {
                path: "transactions/:user/:year",
                component: PanelTransactionsComponent
            },

            {
                path: '',
                redirectTo: '/budget/finance/summary/All/2018'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(financeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FinanceRoutingModule { }