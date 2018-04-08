export class GroceryCartItem {
    constructor(
        public date: string,
        public supermarket: string,
        public name: string,
        public weight: number,
        public count: number,
        public cost: number,
        public organic: number,
        public seasonal: number
    ) { }
}
