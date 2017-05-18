export class UserGrocery {
    constructor(
        public id: number,
        public userName: string,
        public supermarketName: string,
        public name: string,
        public date: string,
        public count: number = 1,
        public weight: number = 0,
        public unit: string = 'lb',
        public price: number = 0
    ) { }
}
