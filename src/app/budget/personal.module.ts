import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';

// services
import { CoreService } from './services/core.service';
import { PersonalService } from './services/personal.service';


// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { PersonalRoutingModule } from './personal-routing.module'

// components
import { PanelBooksComponent } from './panels/personal/books/books.component';
import { ModalBooksComponent } from './modals/personal/books/modal-books.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        PersonalRoutingModule
    ],
    declarations: [
        PanelBooksComponent,
        ModalBooksComponent
    ],
    providers: [
        CoreService,
        PersonalService,
        DatePipe
    ]
})
export class PersonalModule { }
