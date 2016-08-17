import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { HomeComponent }    from './home';
import { HeaderComponent }  from './header';
import { dashboardRouting } from './dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
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