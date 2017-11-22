export class SummaryByCategory {
    category: string;
    year: number;
    amount: number;
    constructor(
        public params: { category: string, year: number, amount: number }
    ) {
        this.category = params.category
        this.year = params.year
        this.amount = params.amount
    }
}