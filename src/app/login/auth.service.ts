import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import * as auth0 from 'auth0-js';
// Avoid name not found warnings

@Injectable()
export class AuthService {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: environment.user.domain,
    clientID: environment.user.clientID
  });

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  authenticated: boolean = false;
  private authenticatedSource = new Subject<any[]>();
  authenticated$ = this.authenticatedSource = new Subject<any[]>();

  constructor(private router: Router) {
  }

  public login(username: string, password: string): void {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        this.authenticationResponse({error: 'User could not be authenticated'});
        return;
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setUser(authResult);
        this.authenticated = true;
        this.redirectUrl ? this.router.navigate([this.redirectUrl]) : this.router.navigate(['/dsahboard']);
      }
    });
  }

  public isAuthenticated(): boolean {
    // don't authenticate in dev
    if (!environment.production) {
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
