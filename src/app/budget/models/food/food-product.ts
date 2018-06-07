export class FoodProduct {
    constructor(
        public id: number,
        public name: string,
        public unit: string,
        public dirty: number,
        public measurement: string,
        public quantityType: string
    ) { }
}
