import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// General Components
import { LoadingComponent } from './loading';
import { DropdownModule } from './dropdown';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingComponent,
    ],
    exports: [
        CommonModule,
        LoadingComponent,
        DropdownModule
    ]
})
export class SharedModule {};

