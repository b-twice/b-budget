import { Component } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
    selector: 'budget-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private authService: AuthService) { }

    private logout(): void {
        this.authService.logout();
    }
}
