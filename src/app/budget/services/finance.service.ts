import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { CoreService } from './core.service'
import { APP_SETTINGS, IAppSettings } from '../../app.settings';

import {
    UserProfile,
    Category,
    UserSummary,
    UserCategoryGrowth,
    Transaction,
    ExpenseMonth,
    Expense,
    TransactionMonthly
} from '../models';

@Injectable()
export class FinanceService extends CoreService {
    constructor(
        public http: Http,
        public authHttp: AuthHttp,
        @Inject(APP_SETTINGS) public settings: IAppSettings
    ) {
        super(http, authHttp, settings);
    }


    public getTransactionCategories(): Observable<Category[]> {
        return this.request<Category[]>('finance/transaction-categories');
    }
    public getExpenseMonths(): Observable<ExpenseMonth[]> {
        return this.request<ExpenseMonth[]>('finance/expense-months');
    }


    public getUserSummary(name: string, year: number): Observable<UserSummary[]> {
        return this.request<UserSummary[]>(`finance/user-summaries/year/${year}/user/${name}`, null, true);
    }
    public getUserProfile(name: string): Observable<UserProfile[]> {
        return this.request<UserProfile[]>(`finance/user-profiles/${name}`, null, true);
    }
    public getUserCategoryGrowth(name: string, year: string): Observable<UserCategoryGrowth[]> {
        return this.request<UserCategoryGrowth[]>(`finance/user-categories-growth/year/${year}/user/${name}`, null, true);
    }

    // to populate the transaction panel
    public getTransactions(name: string, year: string, categories: string[]): Observable<Transaction[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<Transaction[]>(`finance/transactions/year/${year}/user/${name}`, params, true);
    }
    // for expenses, summarizing expense by category by month
    public getTransactionByMonth(name: string, year: string, month: string, category): Observable<Transaction[]> {
        return this.request<Transaction[]>(`finance/transactions/year/${year}/month/${month}/user/${name}/category/${category}`, null, true);
    }
    // for charting
    public getTransactionsMonthly(name: string, year: string, range: number, categories: string[]): Observable<TransactionMonthly[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<TransactionMonthly[]>(`finance/transactions/year/${year}/user/${name}/monthly/range/${range}`, params, true);
    }

    public getExpense(name: string, year: string, months: string[]): Observable<Expense[]> {
        let params = new URLSearchParams();
        months.map(c => params.append('monthNames', c))
        if (months.length) return this.request<Expense[]>(`finance/expenses/year/${year}/user/${name}/monthly`, params, true);
        return this.request<Expense[]>(`finance/expenses/year/${year}/user/${name}`, null, true);
    }

}
