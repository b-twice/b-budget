import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FiscalYear } from '../models/fiscal-year';
import { BudgetService } from '../budget.service';
@Component({
  selector: 'budget-year-nav',
  templateUrl: './year-nav.component.html',
  styleUrls: ['./year-nav.component.scss']
})
export class YearNavComponent implements OnInit {

  private years: string[] = ["2016", "2015"];
  private currentOwner: string;
  private currentYear: string;

  constructor(
    private budgetService: BudgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.budgetService.getFiscalYears()
      .subscribe(
      fiscalYears => this.years = fiscalYears.map(fy => fy.year)
      )

    this.activatedRoute.params.subscribe(
      params => {
        this.currentOwner = params['owner'];
        this.currentYear = params['year'];
      }
    )

  }

  onYearSelect(event): void {
    let yearRoute: string = event.value;
    this.router.navigate(['/budget/owner', this.currentOwner, yearRoute]);

  }

}
