export class UserCategory {
    constructor(
        public fiscalYear: string,
        public userName: string,
        public categoryGroupName: string,
        public categoryName: string,
        public amount: number = 0,
        public growth: number = 0
    ) { }
}