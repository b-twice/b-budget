import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'budget-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  currentPanel: string = '';
  currentAction: string = '';
  constructor(
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.currentPanel = params["panel"];
        this.currentAction = params["action"];
      }
    )
  }

}
