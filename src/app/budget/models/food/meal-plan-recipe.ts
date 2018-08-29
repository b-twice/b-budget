export class MealPlanRecipe {
        constructor(
                public id: number,
                public recipeId: number,
                public mealPlanName: string,
                public mealPlanId: number,
                public name: string,
                public category: string,
                public cookbook: string,
                public pageNumber: number = 0,
                public servings: number = 0,
                public count: number = 1,
                public servingCost: number = 0,
                public cost: number = 0,
                public costOrganic: number = 0,
                public costSeasonal: number = 0
        ) { }
}

