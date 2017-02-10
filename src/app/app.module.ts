import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// app config
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_SETTINGS, AppSettings } from './app.settings';

// app components
import { NotFoundComponent } from './not-found/not-found.component';

// login
import { LoginModule } from './login/login-module';

//shared
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        LoginModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        { provide: APP_SETTINGS, useValue: AppSettings }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
