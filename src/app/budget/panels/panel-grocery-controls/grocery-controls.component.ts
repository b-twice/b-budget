import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-panel-grocery-controls',
  templateUrl: './grocery-controls.component.html',
  styleUrls: ['./grocery-controls.component.scss']
})
export class PanelGroceryControlsComponent implements OnInit {

  user: string;

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.user = params['user'];
      }
    )

  }


}

