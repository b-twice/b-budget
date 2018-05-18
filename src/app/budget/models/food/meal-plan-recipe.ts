export class MealPlanRecipe {
    constructor(
        public id: number,
        public mealPlanName: string,
        public name: string,
        public category: string,
        public cookbook: string,
        public pageNumber: number,
        public servings: number = 0,
        public servingCost: number = 0,
        public cost: number = 0,
        public costOrganic: number = 0,
        public costSeasonal: number = 0
    ) { }
}

