import { OpaqueToken } from '@angular/core';
import { environment } from '../environments/environment';

interface IAuthSettings {
    domain: string,
    clientID: string
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

export let APP_SETTINGS = new OpaqueToken("app.settings")