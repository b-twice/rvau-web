import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { PanelComponent } from './panel';
import { MetabarComponent } from './metabar/metabar.component';
import { ResultsComponent } from './panel/results';
import { ScoreboxComponent } from './panel/results/scorebox';
import { LeagueSummaryComponent } from './panel/league-summary';
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
    ResultsComponent,
    ScoreboxComponent,
    LeagueSummaryComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {}
