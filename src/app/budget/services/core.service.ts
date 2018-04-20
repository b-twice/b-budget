import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
import {
    User,
    FiscalYear
} from '../models';

@Injectable()
export class CoreService {
    constructor(
        public http: Http,
        public authHttp: AuthHttp,
        @Inject(APP_SETTINGS) public settings: IAppSettings
    ) {
    }

    public request<T>(fragment: string, params = null, auth = true): Observable<T> {
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

    public post(data: {}, fragment: string): Observable<any> {
        let postUrl = `${this.settings.apiEndpoint}/${fragment}`;
        let body = JSON.stringify(data);
        let params = new URLSearchParams();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(postUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public put(fragment: string, data: {}): Observable<any> {
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

    public getUsers(): Observable<User[]> {
        return this.request<User[]>('core/users');
    }
    public getFiscalYears(): Observable<FiscalYear[]> {
        return this.request<FiscalYear[]>('core/fiscal-years');
    }

}
