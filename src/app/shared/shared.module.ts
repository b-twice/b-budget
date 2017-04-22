import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// General Components
import { LoadingComponent } from './loading';
import { DropdownModule } from './dropdown';
import { MessageComponent } from './message/message.component';

// Site Components
import { SiteHeaderComponent } from './site-header/site-header.component';

// Services
import { UtilService } from './util/util.service';
import { NumberChangeComponent } from './number-change/number-change.component';
import { SelectIconComponent } from './select-icon/select-icon.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LoadingComponent,
        MessageComponent,
        SiteHeaderComponent,
        NumberChangeComponent,
        SelectIconComponent
    ],
    exports: [
        CommonModule,
        LoadingComponent,
        MessageComponent,
        SiteHeaderComponent,
        DropdownModule,
        NumberChangeComponent,
        SelectIconComponent
    ],
    providers: [
        UtilService
    ]

})
export class SharedModule { };

