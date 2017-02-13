import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { OwnerSummary } from '../models';

@Component({
  selector: 'budget-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.scss']
})
export class OwnerProfileComponent implements OnInit {

  private owner: string;
  private ownerSummary: OwnerSummary;
  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.owner = params['owner'];
        this.getOwnerSummary(this.owner);
      }
    )
  }

  getOwnerSummary(name): void {
    if (name == "All") {
      this.budgetService.getOwnerSummaries()
        .subscribe(
        ownerSummaries => {
          this.ownerSummary = new OwnerSummary("All", 0, 0, 0);
          ownerSummaries.map(o => {
            this.ownerSummary.debt += o.debt;
            this.ownerSummary.asset += o.asset;
            this.ownerSummary.income += o.income;
          });
        }
        );
      return;
    }
    this.budgetService.getOwnerSummary(name)
      .subscribe(
      ownerSummary => this.ownerSummary = ownerSummary
      )
  }
}
