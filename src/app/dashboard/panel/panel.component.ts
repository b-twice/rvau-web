import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { ResultsComponent }  from './results';


@Component({
  selector: 'dashboard-panel',
  template: require('./panel.component.html'),
  styles: [require('./panel.component.scss')],
})
export class PanelComponent implements OnInit, OnDestroy {

  @ViewChild(ResultsComponent)
  private resultsComponent: ResultsComponent;
  leagueSub: Subscription;

  constructor(
    private ds: DashboardService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.leagueSub = this.ds.leagueSource$.subscribe(
      league =>  {
        this.resultsComponent.loaded = false;
        this.apiService.getData('games', { league: league }).subscribe(data =>
          this.resultsComponent.setGames(data.data)
        )
        this.apiService.getData('leaguesummary', {league: league}).subscribe(data =>
          console.log(data)
        )
      }
    );
  };

  ngOnDestroy() {
    this.leagueSub.unsubscribe();
  }
}
