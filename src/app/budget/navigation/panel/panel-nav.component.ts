import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { User, NavigationParams } from '../../models/core';


@Component({
  selector: 'budget-panel-nav',
  templateUrl: './panel-nav.component.html',
  styleUrls: ['./panel-nav.component.scss']
})
export class PanelNavComponent implements OnInit {

  user: string;
  year: string;
  params: NavigationParams;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public navigationService: NavigationService,
  ) { }

  ngOnInit() {
    this.navigationService.updateData.subscribe(data => { this.params = data; console.log(this.params) });
  }
  isActive(group: string, panel: string, ) {
    return this.router.isActive(this.router.createUrlTree(['/budget/', group, panel]), null);
  }


}
