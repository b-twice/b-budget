export class UserExpense {
    constructor(
        public userName: string,
        public year: string,
        public month: string,
        public categoryName: string,
        public plannedExpense: number = 0,
        public actualExpense: number = 0,
        public difference: number = 0
    ) { }
}