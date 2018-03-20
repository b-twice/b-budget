export class UserGrocery {
    constructor(
        public id: number,
        public user: string,
        public supermarket: string,
        public category: string,
        public name: string,
        public date: string,
        public count: number = 1,
        public weight: number = 0,
        public unit: string = 'lb',
        public organic: string = 'No',
        public seasonal: string = 'No',
        public amount: number = 0,
        public unitPrice: number = 0
    ) { }
}
