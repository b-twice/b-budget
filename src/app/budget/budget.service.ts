import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { APP_SETTINGS, IAppSettings } from '../app.settings';
import {
    UserProfile, Category,
    FiscalYear, User, Transaction,
    UserSummary
} from './models';

@Injectable()
export class BudgetService {
    constructor(
        private http: Http,
        @Inject(APP_SETTINGS) private settings: IAppSettings
    ) {
    }

    public makeRequest<T>(fragment: string): Observable<T> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
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
        return this.makeRequest<UserSummary[]>(`user-summaries/year/${year}`);
    }
    public getUserSummary(name: string, year: string): Observable<UserSummary> {
        return this.makeRequest<UserSummary>(`user-summaries/year/${year}/user/${name}`);
    }

    public getUserProfiles(): Observable<UserProfile[]> {
        return this.makeRequest<UserProfile[]>('user-profiles');
    }
    public getUserProfile(name: string): Observable<UserProfile> {
        return this.makeRequest<UserProfile>(`user-profiles/${name}`);
    }
}
