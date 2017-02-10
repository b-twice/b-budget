import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Owner } from '../models/owner';

@Component({
  selector: 'budget-owner-nav',
  templateUrl: './owner-nav.component.html',
  styleUrls: ['./owner-nav.component.scss']
})
export class OwnerNavComponent implements OnInit {

  private owners: Owner[] = [new Owner("Shannon"), new Owner("Brian")];

  constructor(
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    this.getOwners();
  }

  private getOwners() {
    this.budgetService.getOwners()
      .subscribe(
      owners => this.owners = owners
      )
  }

}
