import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { APP_SETTINGS, IAppSettings } from '../app.settings';
import {
    AnnualBudget, Category,
    FiscalYear, Owner, Transaction,
    OwnerSummary
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
    public getOwners(): Observable<Owner[]> {
        return this.makeRequest<Owner[]>('owners');
    }
    public getFiscalYears(): Observable<FiscalYear[]> {
        return this.makeRequest<FiscalYear[]>('fiscal-years');
    }

    public getBudgets(): Observable<AnnualBudget[]> {
        return this.makeRequest<AnnualBudget[]>('annual-budgets');
    }
    public getBudget(name: string, year: string): Observable<AnnualBudget> {
        return this.makeRequest<AnnualBudget>(`annual-budgets/year/${year}/owner/${name}`);
    }

    public getOwnerSummaries(): Observable<OwnerSummary[]> {
        return this.makeRequest<OwnerSummary[]>('owner-summaries');
    }
    public getOwnerSummary(name: string): Observable<OwnerSummary> {
        return this.makeRequest<OwnerSummary>(`owner-summaries/${name}`);
    }
}
