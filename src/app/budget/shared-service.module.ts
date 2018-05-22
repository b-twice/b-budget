import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppService } from './services/app.service';

@NgModule({})
export class SharedServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedServiceModule,
            providers: [AppService]
        };
    }
}