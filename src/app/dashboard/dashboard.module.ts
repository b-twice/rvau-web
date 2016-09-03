import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { PanelComponent } from './panel';
import { MetabarComponent } from './metabar/metabar.component';
import { ResultsComponent } from './results';
import { dashboardRouting } from './dashboard.routes';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    SharedModule,
    dashboardRouting
  ],
  declarations: [
    PanelComponent,
    MetabarComponent,
    ResultsComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {}
