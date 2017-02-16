export class Transaction {
    constructor(
        public bankName: string,
        public userName: string,
        public categoryName: string,
        public date: string,
        public description: string,
        public amount: number,
        public notable: number
    ) { }
}