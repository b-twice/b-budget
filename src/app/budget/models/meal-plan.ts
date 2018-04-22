export class MealPlan {
    constructor(
        public id: number,
        public user: string,
        public name: string,
        public days: number,
        public cost: number = 0,
        public costOrganic: number = 0,
        public costSeasonal: number = 0
    ) { }
}

