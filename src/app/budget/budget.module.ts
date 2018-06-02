import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { SharedServiceModule } from './shared-service.module'

// services
import { CoreService } from './services/core.service';
import { FoodService } from './services/food.service';

// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { FinanceModule } from './finance.module';
import { AuthModule } from './services/auth.module';

// components
import { ModalGroceryListComponent } from './base/grocery-list/modal-grocery-list.component';

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
        ModalGroceryListComponent
    ],
    providers: [
        CoreService,
        FoodService
    ]
})
export class BudgetModule { }
