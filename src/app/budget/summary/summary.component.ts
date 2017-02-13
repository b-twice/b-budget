import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { Budget } from '../models';

@Component({
    selector: 'budget-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

    private budget: Budget;
    constructor(
        private route: ActivatedRoute,
        private budgetService: BudgetService
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe(
            params =>
                this.getBudget(params['owner'], params['year'])
        )
    }

    getBudget(name: string, year: string): void {
        if (!name || !year) { return; }
        if (name == "All") {
            // this.budgetService.getOwnerSummaries()
            //     .subscribe(
            //     ownerSummaries => {
            //         this.ownerSummary = new OwnerSummary("All", 0, 0, 0);
            //         ownerSummaries.map(o => {
            //             this.ownerSummary.debt += o.debt;
            //             this.ownerSummary.asset += o.asset;
            //             this.ownerSummary.income += o.income;
            //         });
            //     }
            //     );
            return;
        }
        this.budgetService.getBudget(name, year)
            .subscribe(
            budget => this.budget = budget
            )
    }

}
