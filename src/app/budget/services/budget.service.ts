import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
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
    UserTransaction
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
    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    handleError(error: Response) {
        return Observable.throw(error.json().errors || 'Server error');
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

    public getUserSummaries(year: string): Observable<[UserSummary]> {
        return this.makeRequest<UserSummary[]>(`user-summaries/year/${year}`, null, true);
    }
    public getUserSummary(name: string, year: string): Observable<[UserSummary]> {
        return this.makeRequest<UserSummary[]>(`user-summaries/year/${year}/user/${name}`, null, true);
    }

    public getUserProfiles(): Observable<UserProfile[]> {
        return this.makeRequest<UserProfile[]>('user-profiles', null, true);
    }
    public getUserProfile(name: string): Observable<UserProfile[]> {
        return this.makeRequest<UserProfile[]>(`user-profiles/${name}`, null, true);
    }

    public getUserCategories(year: string): Observable<[UserCategory]> {
        return this.makeRequest<UserCategory[]>(`user-categories/year/${year}`, null, true);
    }
    public getUserCategory(name: string, year: string): Observable<[UserCategory]> {
        return this.makeRequest<UserCategory[]>(`user-categories/year/${year}/user/${name}`, null, true);
    }

    public getUserTransactions(year: string, categories: string[]): Observable<[UserTransaction]> {
        let params = new URLSearchParams();
        categories.map(c => { params.append('categoryNames', c), console.log(c) })
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}`, params, true);
    }
    public getUserTransaction(name: string, year: string, categories: string[]): Observable<[UserTransaction]> {
        let params = new URLSearchParams();
        categories.map(c => { params.append('categoryNames', c), console.log(c) })
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}/user/${name}`, params, true);
    }
    public getUserTransactionCategory(name: string, year: string, category: string): Observable<[UserTransaction]> {
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}/user/${name}/category/${category}`, null, true);
    }

}
