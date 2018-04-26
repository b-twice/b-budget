export class MealPlanRecipeIngredient {
    constructor(
        public mealPlanName: string,
        public recipe: string,
        public name: string,
        public category: string,
        public count: number = 0,
        public weight: number = 0,
        public unit: string,
        public measurement: string,
        public cost: number = 0,
        public costOrganic: number = 0,
        public costSeasonal: number = 0
    ) { }
}


