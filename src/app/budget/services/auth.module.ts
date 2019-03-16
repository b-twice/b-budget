import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    imports: [
        // ...
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:5000', 'budgetapi.brianbrown.dev']
            }
        })
    ]
})
export class AuthModule { }