import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'budget-dashboard-panel',
    template:
        `
        <router-outlet></router-outlet>
    `,
    styleUrls: []

})
export class BudgetDashboardPanelComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

