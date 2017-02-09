import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'budget-dashboard',
    template:
    `
    <budget-header></budget-header>
    <router-outlet></router-outlet>
  `
})
export class BudgetDashboardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

