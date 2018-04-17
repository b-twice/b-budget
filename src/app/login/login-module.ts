import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


import { AboutComponent } from './about/about.component';

//shared
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        FormsModule,
        LoginRoutingModule,
        CommonModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        AboutComponent
    ]
})
export class LoginModule { };
