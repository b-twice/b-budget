import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FiscalYear } from '../models/fiscal-year';
import { CoreService } from '../services/core.service';
@Component({
  selector: 'budget-year-nav',
  templateUrl: './year-nav.component.html',
  styleUrls: ['./year-nav.component.scss']
})
export class YearNavComponent implements OnInit {

  years: string[];
  currentUser: string;
  currentYear: string;
  currentPanel: string;

  constructor(
    public apiService: CoreService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.apiService.getFiscalYears()
      .subscribe(
        fiscalYears => this.years = fiscalYears.map(fy => fy.year).reverse()
      )

    this.activatedRoute.params.subscribe(
      params => {
        this.currentUser = params['user'];
        this.currentYear = params['year'];
      }
    )

    this.activatedRoute.firstChild.params.subscribe(
      params => {
        this.currentPanel = params['panel'];
      }
    )

  }
}
