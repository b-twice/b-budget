import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
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
    Supermarket
} from '../models';

@Injectable()
export class FoodService extends CoreService {
    constructor(
        public http: Http,
        public authHttp: AuthHttp,
        @Inject(APP_SETTINGS) public settings: IAppSettings
    ) {
        super(http, authHttp, settings);
    }

    public getFoodCategories(): Observable<Category[]> {
        return this.request<Category[]>('food/categories', null, true);
    }
    public getRecipeCategories(): Observable<Category[]> {
        return this.request<Category[]>('food/recipes/categories', null, true);
    }
    public getSupermarkets(): Observable<Supermarket[]> {
        return this.request<Supermarket[]>('food/supermarkets');
    }


    // Groceries
    public getGroceries(name: string, year: string, categories: string[]): Observable<Grocery[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<Grocery[]>(`food/groceries/year/${year}/user/${name}`, params, true);
    }
    public getGroceriesByName(name: string, year: string, groceryName: string): Observable<Grocery[]> {
        return this.request<Grocery[]>(`food/groceries/year/${year}/user/${name}/grocery/${groceryName}`, null, true);
    }
    public getGroceriesMonthly(name: string, year: string, range: number, categories: string[]): Observable<TransactionMonthly[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<TransactionMonthly[]>(`food/groceries/year/${year}/user/${name}/monthly/range/${range}`, params, true);
    }
    public getLatestGrocery(foodProduct: string, supermarket: string): Observable<Grocery> {
        return this.request<Grocery>(`food/groceries/latest/${foodProduct}/supermarket/${supermarket}`, null, true);
    }
    public updateGrocery(id: number, data: any) {
        return this.put(`food/groceries/grocery/${id}`, data);
    }
    public checkoutGroceries(data: any) {
        return this.post(`food/groceries`, data);
    }



    // Food products
    public getAnnualFoodProducts(year: string, categories: string[]): Observable<AnnualFoodProduct[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<AnnualFoodProduct[]>(`food/products/year/${year}`, params, true);
    }
    public getAnnualFoodProduct(name: string, year: string, categories: string[]): Observable<AnnualFoodProduct[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<AnnualFoodProduct[]>(`food/products/year/${year}/user/${name}`, params, true);
    }
    public getAnnualFoodProductByName(name: string, year: string, food_productName: string): Observable<AnnualFoodProduct[]> {
        return this.request<AnnualFoodProduct[]>(`food/products/year/${year}/user/${name}/food_product/${food_productName}`, null, true);
    }
    public getFoodProducts(): Observable<FoodProduct[]> {
        return this.request<FoodProduct[]>('food/products', null, true);
    }

    // Recipes
    public getRecipes(name: string, categories: string[]): Observable<Recipe[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<Recipe[]>(`food/recipes/user/${name}`, params, true);
    }
    public getRecipe(name: string, recipeName: string): Observable<Recipe> {
        return this.request<Recipe>(`food/recipes/user/${name}/recipe/${recipeName}`, null, true);
    }
    public getRecipeIngredients(name: string): Observable<RecipeIngredient[]> {
        return this.request<RecipeIngredient[]>(`food/recipes/recipe/${name}`, null, true);
    }

}
