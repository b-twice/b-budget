import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetDashboardPanelComponent } from './dashboard-panel.component';

//personal
import { PanelBooksComponent } from './panels/personal/books/books.component';
import { ModalBooksComponent } from './modals/personal/books/modal-books.component';

const personalRoutes: Routes = [
    {
        path: '',
        component: BudgetDashboardPanelComponent,
        children: [
            // personal
            {
                path: "books/:user/:year",
                component: PanelBooksComponent,
                children: [
                    {
                        path: ':name',
                        component: ModalBooksComponent,
                        outlet: 'author'
                    }
                ]
            },
            // Don't init component, redirect to user/All to display all in user profile
            {
                path: '',
                redirectTo: '/budget/personal/books/All/2018'
            }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(personalRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PersonalRoutingModule { }
