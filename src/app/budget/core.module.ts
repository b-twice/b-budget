import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { CoreService } from './services/core.service';
import { PanelChartService } from './panels/core/chart/panel-chart.service';

//shared
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from './serve.modules'

import { PanelBaseComponent } from './panels/core/base/panel-base.component';
import { ModalBaseComponent } from './modals/core/base/modal-base.component';
import { PanelChartComponent } from './panels/core/chart/panel-chart.component';

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
        SharedModule,
        RouterModule,
        ServiceModule.forRoot()
    ],
    declarations: [
        PanelBaseComponent,
        ModalBaseComponent,
        PanelChartComponent,
        BudgetDashboardComponent,
        BudgetDashboardPanelComponent,
        HeaderComponent,
        UserNavComponent,
        YearNavComponent,
        PanelNavComponent

    ],
    exports: [
        PanelChartComponent
    ],
    providers: [
        CoreService,
        DatePipe,
        PanelChartService
    ]
})
export class CoreModule { }
