import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { APP_SETTINGS, IAppSettings } from '../app.settings';
import * as auth0 from 'auth0-js';
// Avoid name not found warnings

@Injectable()
export class AuthService {

    // Configure Auth0
    auth0;
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    realm: string;
    audience: string;
    authenticated: boolean = false;
    authenticatedSource = new Subject<any[]>();
    authenticated$ = this.authenticatedSource = new Subject<any[]>();
    settings: IAppSettings

    constructor(
        public router: Router,
        public injector: Injector
    ) {
        const settings = injector.get(APP_SETTINGS);
        this.auth0 = new auth0.WebAuth({
            audience: settings.auth.audience,
            domain: settings.auth.domain,
            clientID: settings.auth.clientID,
            // specify your desired callback URL
            callbackURL: 'http://localhost:3000',
            responseType: 'token id_token',
            scope: 'openid'
        });
        this.realm = settings.auth.realm;
        this.audience = settings.auth.audience;
    }

    login(username: string, password: string): void {
        this.auth0.client.login({
            realm: this.realm,
            username: username,
            password: password,
            audience: this.audience
        }, (err, authResult) => {
            if (err) {
                this.authenticationResponse({ error: 'User could not be authenticated' });
                return;
            }
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setUser(authResult);
                this.authenticated = true;
                this.redirectUrl ? this.router.navigate([this.redirectUrl]) : this.router.navigate(['/budget']);
            }
        });
    }

    isAuthenticated(): boolean {
        // Check whether the id_token is expired or not
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    logout(): void {
        // Remove token from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.router.navigate(['/login']);
        return;
    }

    setUser(authResult): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    authenticationResponse(response): void {
        this.authenticatedSource.next(response);
    }
}
