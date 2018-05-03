import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-panel-grocery-controls',
  templateUrl: './grocery-controls.component.html',
  styleUrls: ['./grocery-controls.component.scss']
})
export class PanelGroceryControlsComponent implements OnInit {

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

