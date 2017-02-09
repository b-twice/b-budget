export class Transaction {
    constructor(
        public bankName: string,
        public ownerName: string,
        public categoryName: string,
        public date: string,
        public description: string,
        public amount: number,
        public notable: number
    ) {}
}