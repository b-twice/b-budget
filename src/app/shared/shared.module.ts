import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// General Components
import { LoadingComponent } from './loading';
import { DropdownModule } from './dropdown';
import { MessageComponent } from './message/message.component';
import { FilterControlsComponent } from './../shared/filter-controls/filter-controls.component';

// Site Components
import { SiteHeaderComponent } from './site-header/site-header.component';

// Services
import { UtilService } from './util/util.service';
import { NumberChangeComponent } from './number-change/number-change.component';
import { SelectIconComponent } from './select-icon/select-icon.component';
import { SelectIconService } from './select-icon/select-icon.service';

// Pipes
import { DynamicSortPipe } from './pipes/dynamic-sort.pipe';
import { MapToIterablePipe } from './pipes/map-to-iterable.pipe';
import { MapToKeysPipe } from './pipes/map-to-keys.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FilterControlsComponent,
        LoadingComponent,
        MessageComponent,
        SiteHeaderComponent,
        NumberChangeComponent,
        SelectIconComponent,
        DynamicSortPipe,
        MapToIterablePipe,
        MapToKeysPipe
    ],
    exports: [
        CommonModule,
        LoadingComponent,
        FilterControlsComponent,
        MessageComponent,
        SiteHeaderComponent,
        DropdownModule,
        NumberChangeComponent,
        SelectIconComponent,
        DynamicSortPipe,
        MapToIterablePipe,
        MapToKeysPipe
    ],
    providers: [
        UtilService,
        SelectIconService
    ]

})
export class SharedModule { };

