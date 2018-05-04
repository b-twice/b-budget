import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';

import { CoreService } from './services/core.service';
import { NavigationService } from './services/navigation.service';
import { PanelChartService } from './panels/core/chart/panel-chart.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { PanelBaseComponent } from './panels/core/base/panel-base.component';
import { ModalBaseComponent } from './modals/core/base/modal-base.component';
import { FormBaseComponent } from './forms/core/base/form-base.component';
import { PanelChartComponent } from './panels/core/chart/panel-chart.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        PanelBaseComponent,
        ModalBaseComponent,
        FormBaseComponent,
        PanelChartComponent
    ],
    exports: [
        PanelChartComponent
    ],
    providers: [
        CoreService,
        NavigationService,
        DatePipe,
        PanelChartService
    ]
})
export class CoreModule { }
