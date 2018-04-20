export class Transaction {
    constructor(
        public id: number,
        public userName: string,
        public bankName: string,
        public categoryGroupName: string,
        public categoryName: string,
        public date: string,
        public description: string,
        public amount: number = 0,
        public notable: number = 0
    ) { }
}