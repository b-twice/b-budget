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

  private owners: Owner[] = [new Owner("Shannon"), new Owner("Brian")];
  private currentYear: string;

  constructor(
    private budgetService: BudgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.getOwners();
  }

  private getOwners() {
    this.budgetService.getOwners()
      .subscribe(
      owners => this.owners = owners
      )

    this.activatedRoute.params.subscribe(
      params =>
        this.currentYear = params['year']
    )
  }

}
