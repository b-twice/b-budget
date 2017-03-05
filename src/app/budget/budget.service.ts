import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { APP_SETTINGS, IAppSettings } from '../app.settings';
import {
    UserProfile, Category,
    FiscalYear, User, Transaction,
    UserSummary, UserCategory,
    UserTransaction
} from './models';

@Injectable()
export class BudgetService {
    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        @Inject(APP_SETTINGS) private settings: IAppSettings
    ) {
    }

    public makeRequest<T>(fragment: string, authenticated = false): Observable<T> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
        if (authenticated) {
            return this.authHttp.get(requestUrl)
                .map(this.extractData)
                .catch(this.handleError);
        }
        return this.http.get(requestUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response) {
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
        return this.makeRequest<UserSummary[]>(`user-summaries/year/${year}`, false);
    }
    public getUserSummary(name: string, year: string): Observable<UserSummary> {
        return this.makeRequest<UserSummary>(`user-summaries/year/${year}/user/${name}`, false);
    }

    public getUserProfiles(): Observable<UserProfile[]> {
        return this.makeRequest<UserProfile[]>('user-profiles', false);
    }
    public getUserProfile(name: string): Observable<UserProfile> {
        return this.makeRequest<UserProfile>(`user-profiles/${name}`, false);
    }

    public getUserCategories(year: string): Observable<[UserCategory]> {
        return this.makeRequest<UserCategory[]>(`user-categories/year/${year}`, false);
    }
    public getUserCategory(name: string, year: string): Observable<[UserCategory]> {
        return this.makeRequest<UserCategory[]>(`user-categories/year/${year}/user/${name}`, false);
    }

    public getUserTransactions(year: string): Observable<[UserTransaction]> {
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}`, false);
    }
    public getUserTransaction(name: string, year: string): Observable<[UserTransaction]> {
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}/user/${name}`, false);
    }
    public getUserTransactionCategory(name: string, year: string, category: string): Observable<[UserTransaction]> {
        return this.makeRequest<UserTransaction[]>(`user-transactions/year/${year}/user/${name}/category/${category}`, false);
    }

}
