import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'budget-panel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PanelSummaryComponent implements OnInit {

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
    ) { }

    ngOnInit() {
    }

    getKeyDisplay(key: string): string {
        return this.displayName[key];
    }

}
