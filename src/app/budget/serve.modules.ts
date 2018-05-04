import { NgModule, ModuleWithProviders } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@NgModule({})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [NavigationService]
        };
    }
}