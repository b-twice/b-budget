export class RecipeIngredient {
    constructor(
        public id: number,
        public recipe: string,
        public name: string,
        public unit: string,
        public measurement: string,
        public count: number = 0,
        public weight: number = 0,
        public cost: number = 0,
        public costOrganic: number = 0,
        public costSeasonal: number = 0
    ) { }
}


