import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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
        public http: HttpClient,
        public injector: Injector
    ) {
        super(http, injector);
    }



    public getTransactionCategories(): Observable<Category[]> {
        return this.request<Category[]>('finance/transaction-categories');
    }
    public getExpenseMonths(): Observable<ExpenseMonth[]> {
        return this.request<ExpenseMonth[]>('finance/expense-months');
    }


    public getUserSummary(name: string, year: number): Observable<UserSummary[]> {
        return this.request<UserSummary[]>(`finance/user-summaries/year/${year}/user/${name}`, null);
    }
    public getUserProfile(name: string): Observable<UserProfile[]> {
        return this.request<UserProfile[]>(`finance/user-profiles/${name}`, null);
    }
    public getUserCategoryGrowth(name: string, year: string): Observable<UserCategoryGrowth[]> {
        return this.request<UserCategoryGrowth[]>(`finance/user-categories-growth/year/${year}/user/${name}`, null);
    }

    // to populate the transaction panel
    public getTransactions(name: string, year: string, categories: string[]): Observable<Transaction[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<Transaction[]>(`finance/transactions/year/${year}/user/${name}`, httpOptions);
    }
    // for expenses, summarizing expense by category by month
    public getTransactionByMonth(name: string, year: string, month: string, category): Observable<Transaction[]> {
        return this.request<Transaction[]>(`finance/transactions/year/${year}/month/${month}/user/${name}/category/${category}`, null);
    }
    // for charting
    public getTransactionsMonthly(name: string, year: string, range: number, categories: string[]): Observable<TransactionMonthly[]> {
        let params = new HttpParams();
        categories.forEach(c => params = params.append('categoryNames', c));
        const httpOptions = { params: params };
        return this.request<TransactionMonthly[]>(`finance/transactions/year/${year}/user/${name}/monthly/range/${range}`, httpOptions);
    }

    public getExpense(name: string, year: string, months: string[]): Observable<Expense[]> {
        let params = new HttpParams();
        months.forEach(c => params = params.append('monthNames', c));
        const httpOptions = { params: params };
        if (months.length) return this.request<Expense[]>(`finance/expenses/year/${year}/user/${name}/monthly`, httpOptions);
        return this.request<Expense[]>(`finance/expenses/year/${year}/user/${name}`, null);
    }

}
