import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { FiscalYear, NavigationParams } from '../../models/core';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'budget-year-nav',
  templateUrl: './year-nav.component.html',
  styleUrls: ['./year-nav.component.scss']
})
export class YearNavComponent implements OnInit {

  years: string[];
  params: NavigationParams;

  constructor(
    public apiService: CoreService,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    public router: Router
  ) { }

  ngOnInit() {
    this.apiService.getFiscalYears()
      .subscribe(
        fiscalYears => this.years = fiscalYears.map(fy => fy.year).reverse()
      )
    this.appService.navigation.subscribe(data => this.params = data);

  }
}
