import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

// General Components
import { LoadingComponent } from './loading';
import { DropdownModule } from './dropdown';

import { ApiService, AuthService } from './services';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { appRoutingProviders } from './app.routes';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingComponent,
    ],
    exports: [
        CommonModule,
        HttpModule,
        LoadingComponent,
        DropdownModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                appRoutingProviders,
                AuthService,
                ApiService,
                AuthHttp,
                provideAuth({
                    headerName: 'Authorization',
                    headerPrefix: 'bearer',
                    tokenName: 'token',
                    tokenGetter: (() => localStorage.getItem('id_token')),
                    globalHeaders: [{ 'Content-Type': 'application/json' }],
                    noJwtError: true
                })
            ]
        };
    }
}
