import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { CoreService } from './core.service'
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    Book,
    Category,
} from '../models';

@Injectable()
export class PersonalService extends CoreService {
    constructor(
        public http: Http,
        public authHttp: AuthHttp,
        @Inject(APP_SETTINGS) public settings: IAppSettings
    ) {
        super(http, authHttp, settings);
    }

    // Books
    public getBooks(name: string, year: string, categories: string[]): Observable<Book[]> {
        let params = new URLSearchParams();
        categories.map(c => params.append('categoryNames', c))
        return this.request<Book[]>(`personal/books/year/${year}/user/${name}`, params, true);
    }
    public getBook(name: string, bookName: string): Observable<Book> {
        return this.request<Book>(`personal/books/user/${name}/book/${bookName}`, null, true);
    }
    public getBooksByAuthor(name: string): Observable<Book[]> {
        return this.request<Book[]>(`personal/books/author/${name}`, null, true);
    }
    public getBookCategories(): Observable<Category[]> {
        return this.request<Category[]>('personal/books/categories', null, true);
    }


}
