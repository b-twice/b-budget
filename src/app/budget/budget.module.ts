import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { BudgetRoutingModule } from './budget-routing.module';

import { BudgetService } from './budget.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { BudgetDashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PanelSummaryComponent } from './panel-summary/summary.component';
import { PanelCategoriesComponent } from './panel-categories/categories.component';
import { PanelTransactionsComponent } from './panel-transactions/transactions.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { YearNavComponent } from './year-nav/year-nav.component';
import { PanelNavComponent } from './panel-nav/panel-nav.component';
import { PanelComponent } from './panel/panel.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule,
        SharedModule
    ],
    declarations: [
        BudgetDashboardComponent,
        PanelSummaryComponent,
        HeaderComponent,
        UserNavComponent,
        UserProfileComponent,
        PanelCategoriesComponent,
        PanelTransactionsComponent,
        YearNavComponent,
        PanelNavComponent,
        PanelComponent
    ],
    providers: [
        // AUTH_PROVIDERS,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        BudgetService
    ]
})
export class BudgetModule { }
