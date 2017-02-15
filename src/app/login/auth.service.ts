import { Injectable, Inject } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
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

    authenticated: boolean = false;
    private authenticatedSource = new Subject<any[]>();
    authenticated$ = this.authenticatedSource = new Subject<any[]>();

    constructor(
        private router: Router,
        @Inject(APP_SETTINGS) private settings: IAppSettings
    ) {
        this.auth0 = new auth0.WebAuth({
            domain: settings.auth.domain,
            clientID: settings.auth.clientID,
            // specify your desired callback URL
            callbackURL: 'http://localhost:3000',
            responseType: 'token id_token'

        });

    }

    public login(username: string, password: string): void {
        this.auth0.client.login({
            realm: 'budget',
            username,
            password
        }, (err, authResult) => {
            if (err) {
                console.log(err)
                this.authenticationResponse({ error: 'User could not be authenticated' });
                return;
            }
            console.log(authResult)
            if (authResult && authResult.idToken && authResult.accessToken) {
                this.setUser(authResult);
                this.authenticated = true;
                this.redirectUrl ? this.router.navigate([this.redirectUrl]) : this.router.navigate(['/budget']);
            }
        });
    }

    public isAuthenticated(): boolean {
        // NOTE - no authentication in dev
        if (!this.settings.production) {
            return true;
        }
        // Check whether the id_token is expired or not
        return tokenNotExpired();
    }

    public logout(): void {
        // Remove token from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
        return;
    }

    private setUser(authResult): void {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    }

    private authenticationResponse(response): void {
        this.authenticatedSource.next(response);
    }
}