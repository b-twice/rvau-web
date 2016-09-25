import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// General Components
import { LoadingComponent } from './shared/loading';
import { DropdownModule } from './shared/dropdown';

import { ApiService, AuthService } from './services';
import { AuthHttp, provideAuth } from 'angular2-jwt';
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
