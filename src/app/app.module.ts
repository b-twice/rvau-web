import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';

// Settings
import { APP_SETTINGS, AppSettings } from './app.settings';

// Modules
import { SharedModule } from './shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule.forRoot(),
        DashboardModule,
        routing,
        AdminModule,
        UserModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: APP_SETTINGS, useValue: AppSettings}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
