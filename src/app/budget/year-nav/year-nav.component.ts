import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { NavigationParams } from '../models';
import { FiscalYear } from '../models/fiscal-year';
import { CoreService } from '../services/core.service';
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
    public navigationService: NavigationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.apiService.getFiscalYears()
      .subscribe(
        fiscalYears => this.years = fiscalYears.map(fy => fy.year).reverse()
      )
    this.navigationService.updateData.subscribe(data => this.params = data);

  }
}
