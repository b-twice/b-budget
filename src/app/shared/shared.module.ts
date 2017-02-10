import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// General Components
import { LoadingComponent } from './loading';
import { DropdownModule } from './dropdown';
import { MessageComponent } from './message/message.component';

// Site Components
import { SiteHeaderComponent } from './site-header/site-header.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingComponent,
        MessageComponent,
        SiteHeaderComponent
    ],
    exports: [
        CommonModule,
        LoadingComponent,
        MessageComponent,
        SiteHeaderComponent,
        DropdownModule
    ]
})
export class SharedModule { };

