export class UserSummary {
    constructor(

        public fiscalYear: number,
        public userName: string,

        public income: number = 0,
        public incomeGrowth: number = 0,

        public incomeTaxable: number = 0,
        public incomeTaxableGrowth: number = 0,

        public takeHomePay: number = 0,
        public takeHomePayGrowth: number = 0,

        public spent: number = 0,
        public spentGrowth: number = 0,

        public saved: number = 0,
        public savedGrowth: number = 0,

        public retirementContribution: number = 0,
        public retirementContributionGrowth: number = 0,

        public stockContribution: number = 0,
        public stockContributionGrowth: number = 0,

        public retirement: number = 0,
        public retirementGrowth: number = 0,

        public stock: number = 0,
        public stockGrowth: number = 0,

        public saving: number = 0,
        public savingGrowth: number = 0,

        public taxed: number = 0,
        public taxedGrowth: number = 0,

        public debt: number = 0,
        public debtGrowth: number = 0,

    ) { }
}
