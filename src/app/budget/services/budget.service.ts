import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    UserProfile, Category,
    FiscalYear, User, Transaction,
    UserSummary, UserCategory,
    UserTransaction, UserGrocery, UserRecipe, UserRecipeIngredient, UserFoodProduct, ExpenseMonth, FoodProduct,
    Supermarket,
    UserExpense, UserBook,
    UserExpenseMonthly
} from '../models';

@Injectable()
export class BudgetService {
    constructor(
        public http: Http,
        public authHttp: AuthHttp,
        @Inject(APP_SETTINGS) public settings: IAppSettings
    ) {
    }

    public makeRequest<T>(fragment: string, params = null, auth = false): Observable<T> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
        if (auth) {
            return this.authHttp.get(requestUrl, new RequestOptions({ search: params }))
                .map(this.extractData)
                .catch(this.handleError);
        }
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public postData(data: {}, fragment: string): Observable<any> {
        let postUrl = `${this.settings.apiEndpoint}/${fragment}`;
        let body = JSON.stringify(data);
        let params = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(postUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public putData(fragment: string, data: {}): Observable<any> {
        let postUrl = `${this.settings.apiEndpoint}/${fragment}`;
        let body = JSON.stringify(data);
        let params = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.put(postUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    handleError(error: Response) {
        try {
            return Observable.throw(error.json().errors || 'Server error');
        }
        catch (e) {
            return Observable.throw('Server error');
        }
    }

    // API CALLS
    public getCategories(): Observable<Category[]> {
        return this.makeRequest<Category[]>('categories');
    }
    public getUsers(): Observable<User[]> {
        return this.makeRequest<User[]>('users');
    }
    public getFiscalYears(): Observable<FiscalYear[]> {
        return this.makeRequest<FiscalYear[]>('fiscal-years');
    }
    public getExpenseMonths(): Observable<ExpenseMonth[]> {
        return this.makeRequest<ExpenseMonth[]>('expense-months');
    }


    public getUserSummaries(year: string): Observable<UserSummary[]> {
        return this.makeRequest<UserSummary[]>(`user-summaries/year/${year}`, null, true);
    }
    public getUserSummary(name: string, year: number): Observable<UserSummary[]> {
        return this.makeRequest<UserSummary[]>(`user-summaries/year/${year}/user/${name}`, null, true);
    }

    public getUserProfiles(): Observable<UserProfile[]> {
        return this.makeRequest<UserProfile[]>('user-profiles', null, true);
    }
    public getUserProfile(name: string): Observable<UserProfile[]> {
        return this.makeRequest<UserProfile[]>(`user-profiles/${name}`, null, true);
    }

    public getUserCategories(year: string): Observable<UserCategory[]> {
        return this.makeRequest<UserCategory[]>(`user-categories/year/${year}`, null, true);
    }
    public getUserCategory(name: string, year: string): Observable<UserCategory[]> {
        return this.makeRequest<UserCategory[]>(`user-categories/year/${year}/user/${name}`, null, true);
    }

    // to populate the transaction panel
    public getUserTransactions(name: string, year: string, categories: string[]): Observable<UserTransaction[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}/user/${name}`, params, true);
    }
    // for expenses, summarizing expense by category by month
    public getUserTransactionByMonth(name: string, year: string, month: string, category): Observable<UserTransaction[]> {
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}/month/${month}/user/${name}/category/${category}`, null, true);
    }
    // for charting
    public getUserTransactionsMonthly(name: string, year: string, range: number, categories: string[]): Observable<UserExpenseMonthly[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserExpenseMonthly[]>(`user-transactions/year/${year}/user/${name}/monthly/range/${range}`, params, true);
    }


    public getUserExpense(name: string, year: string, months: string[]): Observable<UserExpense[]> {
        let params = new URLSearchParams();
        months.map(c => params.append('monthNames', c))
        if (months.length) return this.makeRequest<UserExpense[]>(`user-expenses/year/${year}/user/${name}/monthly`, params, true);
        return this.makeRequest<UserExpense[]>(`user-expenses/year/${year}/user/${name}`, null, true);
    }


    // FOOD API CALLS
    public getFoodCategories(): Observable<Category[]> {
        return this.makeRequest<Category[]>('food-categories');
    }
    public getRecipeCategories(): Observable<Category[]> {
        return this.makeRequest<Category[]>('recipe-categories');
    }
    public getBookCategories(): Observable<Category[]> {
        return this.makeRequest<Category[]>('book-categories');
    }


    // Groceries
    public getUserGroceries(name: string, year: string, categories: string[]): Observable<UserGrocery[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserGrocery[]>(`user-groceries/year/${year}/user/${name}`, params, true);
    }
    public getUserGroceriesByName(name: string, year: string, groceryName: string): Observable<UserGrocery[]> {
        return this.makeRequest<UserGrocery[]>(`user-groceries/year/${year}/user/${name}/grocery/${groceryName}`, null, true);
    }
    public getUserGroceriesMonthly(name: string, year: string, range: number, categories: string[]): Observable<UserExpenseMonthly[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserExpenseMonthly[]>(`user-groceries/year/${year}/user/${name}/monthly/range/${range}`, params, true);
    }
    public getSupermarkets(): Observable<Supermarket[]> {
        return this.makeRequest<Supermarket[]>('supermarkets');
    }
    public getLatestGrocery(foodProduct: string, supermarket: string): Observable<UserGrocery> {
        return this.makeRequest<UserGrocery>(`user-groceries/latest/${foodProduct}/supermarket/${supermarket}`, null, true);
    }

    public putGrocery(id: number, data: any) {
        return this.putData(`grocery-cart/grocery/${id}`, data);

    }


    // Food products
    public getUserFoodProducts(year: string, categories: string[]): Observable<UserFoodProduct[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserFoodProduct[]>(`user-food_products/year/${year}`, params, true);
    }
    public getUserFoodProduct(name: string, year: string, categories: string[]): Observable<UserFoodProduct[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserFoodProduct[]>(`user-food_products/year/${year}/user/${name}`, params, true);
    }
    public getUserFoodProductByName(name: string, year: string, food_productName: string): Observable<UserFoodProduct[]> {
        return this.makeRequest<UserFoodProduct[]>(`user-food_products/year/${year}/user/${name}/food_product/${food_productName}`, null, true);
    }
    public getFoodProducts(): Observable<FoodProduct[]> {
        return this.makeRequest<FoodProduct[]>('food-products');
    }




    // Recipes
    public getUserRecipes(name: string, categories: string[]): Observable<UserRecipe[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserRecipe[]>(`user-recipes/user/${name}`, params, true);
    }
    public getUserRecipe(name: string, recipeName: string): Observable<UserRecipe> {
        return this.makeRequest<UserRecipe>(`user-recipes/user/${name}/recipe/${recipeName}`, null, true);
    }
    public getUserRecipeIngredients(name: string): Observable<UserRecipeIngredient[]> {
        return this.makeRequest<UserRecipeIngredient[]>(`user-recipe-ingredients/recipe/${name}`, null, true);
    }

    // Books
    public getUserBooks(name: string, year: string, categories: string[]): Observable<UserBook[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.makeRequest<UserBook[]>(`user-books/year/${year}/user/${name}`, params, true);
    }
    public getUserBook(name: string, bookName: string): Observable<UserBook> {
        return this.makeRequest<UserBook>(`user-books/user/${name}/book/${bookName}`, null, true);
    }
    public getBooksByAuthor(name: string): Observable<UserBook[]> {
        return this.makeRequest<UserBook[]>(`user-books/author/${name}`, null, true);
    }

}
