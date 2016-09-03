import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dashboard-panel',
  template: require('./panel.component.html'),
  styles: [require('./panel.component.scss')],
})
export class PanelComponent implements OnInit, OnDestroy {

  private activeLeague: string;
  leagueSub: Subscription;

  constructor(
    private ds: DashboardService
  ) {}

  ngOnInit() {
    this.leagueSub = this.ds.leagueSource$.subscribe(
      league => this.activeLeague = league
    )
  }

  ngOnDestroy() {
    this.leagueSub.unsubscribe();
  }
}
