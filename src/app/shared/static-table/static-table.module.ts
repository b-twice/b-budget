import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapPipe } from './static-table.pipes';
import { StaticTableComponent } from './static-table.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        StaticTableComponent,
        MapPipe
    ],
    exports: [
        StaticTableComponent
    ],
    providers: [
    ]
})
export class StaticTableModule { }
