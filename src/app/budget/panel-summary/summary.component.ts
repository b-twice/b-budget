import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { AnnualBudget } from '../models';
import { UtilService } from '../../shared/util/util.service';

@Component({
    selector: 'budget-panel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PanelSummaryComponent implements OnInit {

    private budget: AnnualBudget;
    private displayKeyOrder: string[] = [
        "toSpend",
        "spent",
        "saved",
        "invested",
        "taxed",
        "debt"
    ]
    private displayName: {} = {
        toSpend: "Spending Amount",
        spent: "Money Spent",
        saved: "Savings",
        invested: "Investments",
        taxed: "Taxed",
        debt: "Debts",

    }
    constructor(
        private route: ActivatedRoute,
        private budgetService: BudgetService,
        private utilService: UtilService
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
            this.budgetService.getBudgets()
                .subscribe(
                budgets =>
                    this.budget = this.utilService.combineObjectValues(new AnnualBudget(year, "All"), budgets,
                        ["toSpend", "toSpendGrowth", "spent", "spentGrowth", "saved", "savedGrowth", "saved",
                            "invested", "investedGrowth", "taxed", "taxedGrowth", "debt", "debtGrowth"])

                );
            return;
        }
        this.budgetService.getBudget(name, year)
            .subscribe(
            budget => this.budget = budget
            )
    }

    getGrowth(key: string): number {
        return this.budget[key + 'Growth'];
    }

}
