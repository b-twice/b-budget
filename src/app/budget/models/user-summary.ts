export class UserSummary {
    constructor(

        public fiscalYear: string,
        public userName: string,

        public toSpend: number = 0,
        public toSpendGrowth: number = 0,

        public spent: number = 0,
        public spentGrowth: number = 0,

        public saved: number = 0,
        public savedGrowth: number = 0,

        public retirement: number = 0,
        public retirementGrowth: number = 0,

        public stock: number = 0,
        public stockGrowth: number = 0,

        public taxed: number = 0,
        public taxedGrowth: number = 0,

        public debt: number = 0,
        public debtGrowth: number = 0,

    ) { }
}
