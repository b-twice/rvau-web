import { OpaqueToken } from '@angular/core';
import { environment } from '../environments/environment';
export interface IAppSettings {
    readonly production: boolean;
    readonly apiEndpoint: string;
}

export const AppSettings: IAppSettings = {
    production: environment.production,
    apiEndpoint: environment.apiEndpoint
}

export let APP_SETTINGS = new OpaqueToken("app.settings")

