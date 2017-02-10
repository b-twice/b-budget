import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'budget-dashboard',
    template:
    `
    <budget-header></budget-header>
    <budget-owner-nav></budget-owner-nav>
    <div class="dashboard-layout">
        <main>
            <budget-owner-profile></budget-owner-profile>
            <div class="dashboard-main">
                <budget-year-nav></budget-year-nav>
                <router-outlet></router-outlet>
            </div>
        </main>
    </div>
    `,
    styleUrls: ['./dashboard.component.scss']

})
export class BudgetDashboardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

