import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Owner } from '../models/owner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-owner-nav',
  templateUrl: './owner-nav.component.html',
  styleUrls: ['./owner-nav.component.scss']
})
export class OwnerNavComponent implements OnInit {

  private owners: Owner[];
  private currentYear: string;
  private currentPanel: string

  constructor(
    private budgetService: BudgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.getOwners();
    this.activatedRoute.params.subscribe(
      params =>
        this.currentYear = params['year']
    )

    this.activatedRoute.firstChild.params.subscribe(
      params =>
        this.currentPanel = params['panel']
    )


  }

  private getOwners() {
    this.budgetService.getOwners()
      .subscribe(
      owners => this.owners = owners
      )
  }

}
