export class MealPlanGrocery {
    constructor(
        public mealPlanName: string,
        public mealPlanId: number,
        public name: string,
        public category: string,
        public count: number = 0,
        public weight: number = 0,
        public unit: string,
        public dirty: number = 0,
        public supermarket: string,
        public remove: false
    ) { }
}


