import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';


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
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
