import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';


import { MetabarComponent } from './metabar';

// Dashboard
import { DashboardComponent } from './';
// Panel 
import { PanelComponent } from './panel';
// Season Scores
import { ScoresComponent } from './scores';
import { ScoreboxComponent } from './scores/scorebox';
// Season Results
import { LeagueSummaryComponent } from './league-summary';
// Team Page
import { TeamComponent} from './team';
import { TeamSummaryComponent } from './team-summary';
import { TeamPlayersComponent } from './team-players';

import { DashboardRoutingModule} from './dashboard.routes';
import { DashboardService } from './dashboard.service';

import { MapPipe } from './dashboard.pipes';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    PanelComponent,
    MetabarComponent,
    ScoresComponent,
    ScoreboxComponent,
    LeagueSummaryComponent,
    TeamComponent,
    TeamSummaryComponent,
    TeamPlayersComponent,
    MapPipe
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {}
