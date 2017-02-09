import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'budget-dashboard',
  template:
  `
    <budget-summary></budget-summary>
    <router-outlet></router-outlet>
  `
})
export class BudgetDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

