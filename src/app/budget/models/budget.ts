export class Budget {
    constructor(
        public id: number,
        public fiscalYear: string,
        public ownerName: string,
        public toSpend: string,
        public toSpendGrowth: number,
        public spent: number,
        public spentGrowth: number,
        public saved: number,
        public savedGrowth: number,
        public invested: number,
        public investedGrowth: number,
        public taxed: number,
        public taxedGrowth: number,
        public debt: number,
        public debtGrowth:number,
    ) {}
}
