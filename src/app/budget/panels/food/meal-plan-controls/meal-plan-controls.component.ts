import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-panel-meal-plan-controls',
  templateUrl: './meal-plan-controls.component.html',
  styleUrls: ['./meal-plan-controls.component.scss']
})
export class PanelMealPlanControlsComponent implements OnInit {

  user: string;
  year: string;

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
      }
    )

  }


}

