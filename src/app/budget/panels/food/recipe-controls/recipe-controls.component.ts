import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-panel-recipe-controls',
  templateUrl: './recipe-controls.component.html',
  styleUrls: ['./recipe-controls.component.scss']
})
export class PanelRecipeControlsComponent implements OnInit {

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

