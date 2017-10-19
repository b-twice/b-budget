export class UserExpenseMonthly {
    constructor(
        public id: number,
        public userName: string,
        public year: string,
        public month: string,
        public amount: number = 0,
    ) { }
}