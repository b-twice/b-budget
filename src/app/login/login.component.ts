import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'budget-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    authenticating: boolean = false;
    authenticationError: string;

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.authenticated$.subscribe(resp => {
            this.authenticating = false;
            this.authenticationError = resp['error'];
        })
    }

    login(username: string, password: string): void {
        this.authenticating = true;
        this.authenticationError = '';
        this.authService.login(username, password);
    }

}
