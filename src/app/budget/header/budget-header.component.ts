import { Component } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
    selector: 'budget-header',
    templateUrl: './budget-header.component.html',
    styleUrls: ['./budget-header.component.scss']
})
export class BudgetHeaderComponent {

    constructor(private authService: AuthService) { }

    private logout(): void {
        this.authService.logout();
    }
}
