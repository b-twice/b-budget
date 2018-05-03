export class Transaction {
    year: string;
    month: string;
    amount: number;
    constructor(
        public params: { year: string, month: string, amount: number }
    ) {
        this.year = params.year
        this.month = params.month
        this.amount = params.amount
    }
}