import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'budget-dashboard',
    template:
        `
    <budget-header></budget-header>
    <budget-user-nav></budget-user-nav>
    <div class="dashboard-layout">
        <main>
            <aside class="dashboard-sidebar">
                <budget-user-profile></budget-user-profile>
                <budget-panel-nav></budget-panel-nav>
                <budget-year-nav></budget-year-nav>
            </aside>
            <section class="dashboard-main">
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

