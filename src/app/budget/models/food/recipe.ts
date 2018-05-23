export class Recipe {
    constructor(
        public id: number,
        public user: string,
        public cookbook: string,
        public category: string,
        public name: string,
        public pageNumber: number = 0,
        public servings: number = 0,
        public servingCost: number = 0,
        public cost: number = 0,
        public costOrganic: number = 0,
        public costSeasonal: number = 0
    ) { }
}

