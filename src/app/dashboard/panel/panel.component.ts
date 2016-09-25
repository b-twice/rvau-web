import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { ScoresComponent }  from '../scores';
import { LeagueSummaryComponent }  from '../league-summary';

@Component({
  selector: 'dashboard-panel',
  template: require('./panel.component.html'),
  styles: [require('./panel.component.scss')],
})
export class PanelComponent implements OnInit, OnDestroy {

  @ViewChild(ScoresComponent)
  private scoresComponent: ScoresComponent;

  @ViewChild(LeagueSummaryComponent)
  private leagueSummaryComponent: LeagueSummaryComponent;

  leagueSub: Subscription;

  constructor(
    private ds: DashboardService,
    private apiService: ApiService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.leagueSub = this.ds.leagueSource$.subscribe(
      league =>  {
        this.scoresComponent.loaded = false;
        this.leagueSummaryComponent.loaded = false;
        this.apiService.getData('games', { league: league }).subscribe(response => 
          this.scoresComponent.set(response.data, response.keys)
        )
        this.apiService.getData('leaguesummary', {
          league: league, exclude: ['id', 'league', 'champion'], DESC: ['win_count', 'tie_count', "point_diff"] 
        }).subscribe(response => {
          this.leagueSummaryComponent.set(response.data, response.keys);
          this.ref.detectChanges
        })
      }
    );
  };

  ngOnDestroy() {
    this.leagueSub.unsubscribe();
  }
}
