import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CoreService } from './core.service'
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    Grocery,
    Recipe,
    RecipeIngredient,
    AnnualFoodProduct,
    FoodProduct,
    TransactionMonthly,
    Category,
    Supermarket,
    MealPlan
} from '../models';

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
    public updateGrocery(id: number, data: any) {
        return this.put(`food/groceries/grocery/${id}`, data);
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

    // Recipes
    public getRecipes(name: string, categories: string[]): Observable<Recipe[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<Recipe[]>(`food/recipes/user/${name}`, httpOptions);
    }
    public getRecipe(name: string, recipeName: string): Observable<Recipe> {
        return this.request<Recipe>(`food/recipes/user/${name}/recipe/${recipeName}`, null);
    }
    public getRecipeIngredients(name: string): Observable<RecipeIngredient[]> {
        return this.request<RecipeIngredient[]>(`food/recipes/recipe/${name}`, null);
    }

    // Meal Plans
    public getMealPlans(name: string): Observable<MealPlan[]> {
        return this.request<MealPlan[]>(`food/meal-plans/user/${name}`, null);
    }
    public getMealPlanRecipes(name: string): Observable<Recipe[]> {
        return this.request<Recipe[]>(`food/meal-plans/recipes/${name}`, null);
    }


}
