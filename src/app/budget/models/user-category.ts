export class UserCategory {
    constructor(
        public fiscalYear: string,
        public userName: string,
        public categoryName: string,
        public amount: number = 0
    ) { }
}