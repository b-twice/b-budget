import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

interface IAuthSettings {
    readonly domain: string,
    readonly clientID: string
    readonly realm: string;
    readonly audience: string;
}
export interface IAppSettings {
    readonly production: boolean;
    readonly siteHeader: string;
    readonly apiEndpoint: string;
    readonly auth: IAuthSettings;
}

export const AppSettings: IAppSettings = {
    production: environment.production,
    siteHeader: environment.siteHeader,
    apiEndpoint: environment.apiEndpoint,
    auth: environment.auth
}

export let APP_SETTINGS = new InjectionToken<IAppSettings>("app.settings")