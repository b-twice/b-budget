import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserSummary } from '../models';
import { UtilService } from '../../shared/util/util.service';

@Component({
    selector: 'budget-panel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PanelSummaryComponent implements OnInit {

    private userSummary: UserSummary;
    private displayKeyOrder: string[] = [
        "toSpend",
        "spent",
        "saved",
        "invested",
        "taxed",
        "debt"
    ]
    private displayName: {} = {
        toSpend: "Money to Spend",
        spent: "Spent",
        saved: "Saved",
        invested: "Invested",
        taxed: "Taxed",
        debt: "Remaining Debts",

    }
    constructor(
        private route: ActivatedRoute,
        private budgetService: BudgetService,
        private utilService: UtilService
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe(
            params =>
                this.getBudget(params['user'], params['year'])
        )
    }

    getBudget(name: string, year: string): void {
        if (!name || !year) { return; }
        if (name == "All") {
            this.budgetService.getUserSummaries()
                .subscribe(
                userSummaries =>
                    this.userSummary = this.utilService.combineObjectValues(new UserSummary(year, "All"), userSummaries,
                        ["toSpend", "toSpendGrowth", "spent", "spentGrowth", "saved", "savedGrowth", "saved",
                            "invested", "investedGrowth", "taxed", "taxedGrowth", "debt", "debtGrowth"])

                );
            return;
        }
        this.budgetService.getUserSummary(name, year)
            .subscribe(
            userSummary => this.userSummary = userSummary
            )
    }

    getGrowth(key: string): number {
        return this.userSummary[key + 'Growth'];
    }

    getKeyDisplay(key: string): string {
        return this.displayName[key];
    }

}
