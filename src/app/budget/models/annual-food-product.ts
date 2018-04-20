export class AnnualFoodProduct {
    constructor(
        public id: number,
        public user: string,
        public category: string,
        public name: string,
        public year: string,
        public count: number = 1,
        public weight: number = 0,
        public unit: string = 'lb',
        public amount: number = 0,
        public unitPrice: number = 0
    ) { }
}
