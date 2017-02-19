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

    private userSummary: UserSummary[];
    private displayGroupsOrder: string[] = [
        "Earnings",
        "Investments",
        "Assets",
        "Other"
    ]
    private displayGroups: {} = {
        Earnings: [
            "income",
            "incomeTaxable",
            "takeHomePay",
        ],
        Investments: [
            "saved",
            "retirementContribution",
            "stockContribution"
        ],
        Assets: [
            "saving",
            "retirement",
            "stock",
        ],
        Other: [
            "spent",
            "taxed",
            "debt"
        ]
    }
    private displayName: {} = {
        income: "Gross Income",
        incomeTaxable: "Taxable Income",
        takeHomePay: "Take Home Pay",
        spent: "Money Spent",
        saved: "Saved",
        retirementContribution: "Retirement",
        stockContribution: "Personal Investments",
        saving: "Savings",
        retirement: "Retirement",
        stock: "Personal Investments",
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
                this.getBudget(params['user'], params['year'])
        )
    }

    getBudget(name: string, year: string): void {
        this.userSummary = [];
        if (!name || !year) { return; }
        if (name == "All") {
            this.budgetService.getUserSummaries(year)
                .subscribe(
                userSummaries =>
                    this.userSummary.push(this.utilService.combineObjectValues(new UserSummary(year, "All"), userSummaries))

                );
            return;
        }
        this.budgetService.getUserSummary(name, year)
            .subscribe(
            userSummary => this.userSummary.push(userSummary)
            )
    }

    getGrowth(key: string): number {
        return this.userSummary[0][key + 'Growth'];
    }

    getKeyDisplay(key: string): string {
        return this.displayName[key];
    }

}
