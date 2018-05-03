import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';

// services
import { CoreService } from './services/core.service';
import { NavigationService } from './services/navigation.service';

// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { FinanceModule } from './finance.module';
import { AuthModule } from './services/auth.module';

// components
import { BudgetDashboardComponent } from './dashboard.component';
import { BudgetDashboardPanelComponent } from './dashboard-panel.component';
import { HeaderComponent } from './base/header/header.component';
import { UserNavComponent } from './navigation/user/user-nav.component';
import { YearNavComponent } from './navigation/year/year-nav.component';
import { PanelNavComponent } from './navigation/panel/panel-nav.component';


@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule,
        SharedModule,
        AuthModule,
        FinanceModule,
        CoreModule
    ],
    declarations: [
        BudgetDashboardComponent,
        BudgetDashboardPanelComponent,
        HeaderComponent,
        UserNavComponent,
        YearNavComponent,
        PanelNavComponent
    ],
    providers: [
        CoreService,
        NavigationService
    ]
})
export class BudgetModule { }
