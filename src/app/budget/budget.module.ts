import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { SharedServiceModule } from './shared-service.module'

// services
import { CoreService } from './services/core.service';

// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { FinanceModule } from './finance.module';
import { AuthModule } from './services/auth.module';


@NgModule({
    imports: [
        CommonModule,
        BudgetRoutingModule,
        SharedModule,
        AuthModule,
        FinanceModule,
        CoreModule,
        SharedServiceModule.forRoot()
    ],
    declarations: [
    ],
    providers: [
        CoreService
    ]
})
export class BudgetModule { }
