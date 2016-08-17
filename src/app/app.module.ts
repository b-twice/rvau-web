import { NgModule, provide } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { UserComponent } from './user'; 
import { ApiService } from './services';
import { routing, appRoutingProviders } from './app.routes';


// Modules
import { DashboardModule } from './dashboard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        DashboardModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders,
        ApiService,
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig({
                    tokenName: 'jwt'
                }), http);
            },
            deps: [Http]
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }