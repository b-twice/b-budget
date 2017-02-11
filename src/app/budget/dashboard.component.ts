import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'budget-dashboard',
    template:
    `
    <budget-header></budget-header>
    <budget-owner-nav></budget-owner-nav>
    <div class="dashboard-layout">
        <main>
            <aside class="dashboard-sidebar">
                <budget-owner-profile></budget-owner-profile>
                <budget-year-nav></budget-year-nav>
            </aside>
            <section class="dashboard-main">
                <budget-panel-nav></budget-panel-nav>
                <router-outlet></router-outlet>
            </section>
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

