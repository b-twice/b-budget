import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-panel-nav',
  templateUrl: './panel-nav.component.html',
  styleUrls: ['./panel-nav.component.scss']
})
export class PanelNavComponent implements OnInit {

  user: string;
  year: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.firstChild.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
      }
    );
  }
  isActive(panel: string, ) {
    return this.router.isActive(this.router.createUrlTree(['/budget/', panel]), null);
  }


}
