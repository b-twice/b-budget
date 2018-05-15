import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service'
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    Grocery,
    Recipe,
    RecipeIngredient,
    MealPlanGrocery,
    AnnualFoodProduct,
    FoodProduct,
    Supermarket,
    MealPlan,
    Cookbook
} from '../models/food';
import { TransactionMonthly } from '../models/finance';
import { Category } from '../models/core';

@Injectable()
export class FoodService extends CoreService {
    constructor(
        public http: HttpClient,
        public injector: Injector
    ) {
        super(http, injector);
    }


    public getFoodCategories(): Observable<Category[]> {
        return this.request<Category[]>('food/categories', null);
    }
    public getRecipeCategories(): Observable<Category[]> {
        return this.request<Category[]>('food/recipes/categories', null);
    }
    public getSupermarkets(): Observable<Supermarket[]> {
        return this.request<Supermarket[]>('food/supermarkets');
    }
    public getCookbooks(): Observable<Cookbook[]> {
        return this.request<Cookbook[]>('food/cookbooks');
    }


    // Groceries
    public getGroceries(name: string, year: string, categories: string[]): Observable<Grocery[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<Grocery[]>(`food/groceries/year/${year}/user/${name}`, httpOptions);
    }
    public getGroceriesByName(name: string, year: string, groceryName: string): Observable<Grocery[]> {
        return this.request<Grocery[]>(`food/groceries/year/${year}/user/${name}/grocery/${groceryName}`, null);
    }
    public getGroceriesMonthly(name: string, year: string, range: number, categories: string[]): Observable<TransactionMonthly[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<TransactionMonthly[]>(`food/groceries/year/${year}/user/${name}/monthly/range/${range}`, httpOptions);
    }
    public getLatestGrocery(foodProduct: string, supermarket: string): Observable<Grocery> {
        return this.request<Grocery>(`food/groceries/latest/${foodProduct}/supermarket/${supermarket}`, null);
    }
    public getGrocery(id: number): Observable<Grocery> {
        return this.request(`food/groceries/grocery/${id}`, null);
    }
    public updateGrocery(id: number, data: any) {
        return this.put(`food/groceries/grocery/${id}`, data);
    }
    public deleteGrocery(id: number) {
        return this.delete(`food/groceries/grocery/${id}`);
    }
    public checkoutGroceries(data: any) {
        return this.post(`food/groceries`, data);
    }



    // Food products
    public getAnnualFoodProduct(name: string, year: string, categories: string[]): Observable<AnnualFoodProduct[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<AnnualFoodProduct[]>(`food/products/year/${year}/user/${name}`, httpOptions);
    }
    public getAnnualFoodProductByName(name: string, year: string, food_productName: string): Observable<AnnualFoodProduct[]> {
        return this.request<AnnualFoodProduct[]>(`food/products/year/${year}/user/${name}/food_product/${food_productName}`, null);
    }
    public getFoodProducts(): Observable<FoodProduct[]> {
        return this.request<FoodProduct[]>('food/products', null);
    }
    public getFoodProduct(name: string): Observable<FoodProduct> {
        return this.request<FoodProduct>(`food/products/product/${name}`, null);
    }


    // Recipes
    public getRecipesAll(): Observable<Recipe[]> {
        return this.request<Recipe[]>(`food/recipes`, null);
    }
    public getRecipes(name: string, categories: string[]): Observable<Recipe[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<Recipe[]>(`food/recipes/user/${name}`, httpOptions);
    }
    public getRecipe(id: number): Observable<Recipe> {
        return this.request<Recipe>(`food/recipes/recipe/${id}`, null);
    }
    public addRecipe(data: Recipe) {
        return this.post('food/recipes/recipe', data);
    }
    public updateRecipe(id: number, data: any) {
        return this.put(`food/recipes/recipe/${id}`, data);
    }
    public deleteRecipe(id: number) {
        return this.delete(`food/recipes/recipe/${id}`);
    }

    public getRecipeIngredients(id: number): Observable<RecipeIngredient[]> {
        return this.request<RecipeIngredient[]>(`food/recipes/ingredients/${id}`, null);
    }

    public getRecipeIngredient(id: number): Observable<RecipeIngredient> {
        return this.request<RecipeIngredient>(`food/recipes/ingredient/${id}`, null);
    }
    public postIngredients(data: any) {
        return this.post(`food/recipes/ingredients`, data);
    }
    public addRecipeIngredient(data: RecipeIngredient) {
        return this.post('food/recipes/ingredient', data);
    }
    public updateRecipeIngredient(id: number, data: any) {
        return this.put(`food/recipes/ingredient/${id}`, data);
    }
    public deleteRecipeIngredient(id: number) {
        return this.delete(`food/recipes/ingredient/${id}`);
    }




    // Meal Plans
    public getMealPlan(id: number): Observable<MealPlan> {
        return this.request<MealPlan>(`food/meal-plans/meal-plan/${id}`, null);
    }
    public getMealPlans(name: string): Observable<MealPlan[]> {
        return this.request<MealPlan[]>(`food/meal-plans/user/${name}`, null);
    }
    public getMealPlanRecipes(name: string): Observable<Recipe[]> {
        return this.request<Recipe[]>(`food/meal-plans/recipes/${name}`, null);
    }
    public getMealPlanGroceries(name: string): Observable<MealPlanGrocery[]> {
        return this.request<MealPlanGrocery[]>(`food/meal-plans/groceries/${name}`, null);
    }
    public addMealPlan(data: MealPlan) {
        return this.post('food/meal-plans/meal-plan', data);
    }
    public updateMealPlan(id: number, data: any) {
        return this.put(`food/meal-plans/meal-plan/${id}`, data);
    }
    public deleteMealPlan(id: number) {
        return this.delete(`food/meal-plans/meal-plan/${id}`);
    }
}
