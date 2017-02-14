export class AnnualBudget {
    constructor(
        public fiscalYear: string,
        public ownerName: string,
        public toSpend: number = 0,
        public toSpendGrowth: number = 0,
        public spent: number = 0,
        public spentGrowth: number = 0,
        public saved: number = 0,
        public savedGrowth: number = 0,
        public invested: number = 0,
        public investedGrowth: number = 0,
        public taxed: number = 0,
        public taxedGrowth: number = 0,
        public debt: number = 0,
        public debtGrowth: number = 0,
    ) { }
}
