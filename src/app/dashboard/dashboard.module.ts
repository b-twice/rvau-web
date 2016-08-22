import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HomeComponent } from './home';
import { HeaderComponent } from './header';

import { dashboardRouting } from './dashboard.routes';

@NgModule({
  imports: [
    SharedModule,
    dashboardRouting
  ],
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  providers: [
  ]
})
export class DashboardModule {}
