import { NgModule, ModuleWithProviders } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@NgModule({})
export class SharedServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedServiceModule,
            providers: [NavigationService]
        };
    }
}