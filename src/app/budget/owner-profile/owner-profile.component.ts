import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { OwnerSummary } from '../models';
import { UtilService } from '../../shared/util/util.service';

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
    private budgetService: BudgetService,
    private utilService: UtilService
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
        ownerSummaries =>
          this.ownerSummary = this.utilService.combineObjectValues<OwnerSummary>(new OwnerSummary("All"), ownerSummaries, ["debt", "asset", "income"])
        );
      return;
    }
    this.budgetService.getOwnerSummary(name)
      .subscribe(
      ownerSummary => this.ownerSummary = ownerSummary
      )
  }
}
