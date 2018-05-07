import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { CoreService } from './services/core.service';
import { PanelChartService } from './panels/core/chart/panel-chart.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { FormBaseComponent } from './forms/core/base/form-base.component';
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
import { UserProfileComponent } from './base/user-profile/user-profile.component';
import { UserProfileTransformPipe } from './base/user-profile/user-profile-transform.pipe';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
    declarations: [
        PanelBaseComponent,
        FormBaseComponent,
        ModalBaseComponent,
        PanelChartComponent,
        BudgetDashboardComponent,
        BudgetDashboardPanelComponent,
        HeaderComponent,
        UserNavComponent,
        YearNavComponent,
        PanelNavComponent,
        UserProfileComponent,
        UserProfileTransformPipe

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
