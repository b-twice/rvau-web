import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';


import { MetabarComponent } from './metabar/metabar.component';

// Panel 
import { PanelComponent } from './panel';
// Season Scores
import { ScoresComponent } from './scores';
import { ScoreboxComponent } from './scores/scorebox';
// Season Results
import { LeagueSummaryComponent } from './league-summary';


import { dashboardRouting } from './dashboard.routes';
import { DashboardService } from './dashboard.service';

import { StaticTableModule } from '../shared/static-table'

@NgModule({
  imports: [
    SharedModule,
    StaticTableModule,
    dashboardRouting
  ],
  declarations: [
    PanelComponent,
    MetabarComponent,
    ScoresComponent,
    ScoreboxComponent,
    LeagueSummaryComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {}
