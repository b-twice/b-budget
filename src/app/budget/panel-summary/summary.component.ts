import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../services/budget.service';
import { UserSummary } from '../models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'budget-panel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PanelSummaryComponent implements OnInit {

    userSummary: Observable<UserSummary[]>;
    name: string;
    year: string;
    displayGroupsOrder: string[] = [
        "Earnings",
        "Investments",
        "Assets",
        "Other"
    ]
    displayGroups: {} = {
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
    displayName: {} = {
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
        public route: ActivatedRoute,
        public budgetService: BudgetService,
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe(
            params =>
                this.getBudget(params['user'], params['year'])
        )
    }

    getBudget(name: string, year: string): void {
        if (!name || !year) { return; }
        this.name = name;
        this.year = year;
        this.userSummary = this.budgetService.getUserSummary(name, year)
    }

    getKeyDisplay(key: string): string {
        return this.displayName[key];
    }

}
