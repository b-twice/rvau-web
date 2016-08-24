import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HomeComponent } from './home';
import { MetabarComponent } from './metabar/metabar.component';

import { dashboardRouting } from './dashboard.routes';

@NgModule({
  imports: [
    SharedModule,
    dashboardRouting
  ],
  declarations: [
    HomeComponent,
    MetabarComponent
  ],
  providers: [
  ]
})
export class DashboardModule {}
