import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'budget-dashboard',
    template:
    `
    <budget-header></budget-header>
    <budget-owner-nav></budget-owner-nav>
    <router-outlet></router-outlet>
    `,
    styleUrls: ['./dashboard.component.scss']

})
export class BudgetDashboardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

