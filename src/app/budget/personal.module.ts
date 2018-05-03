import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// services
import { CoreService } from './services/core.service';
import { PersonalService } from './services/personal.service';
import { NavigationService } from './services/navigation.service';


// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './services/auth.module';

// components
import { PanelBooksComponent } from './panels/personal/books/books.component';
import { ModalBooksComponent } from './modals/personal/books/modal-books.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthModule,
        CoreModule,
        RouterModule
    ],
    declarations: [
        PanelBooksComponent,
        ModalBooksComponent
    ],
    providers: [
        CoreService,
        PersonalService,
        NavigationService,
        DatePipe
    ]
})
export class PersonalModule { }
