import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { ScoresComponent } from '../scores';
import { LeagueSummaryComponent } from '../league-summary';

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
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // First time component loaded send route to metabar
    // since metabar can't see child route params
    var currentRoute = "";
    let route = this.route.snapshot.url;
    currentRoute = !route.length ? "2016 Summer" : route[0].path   
    this.ds.sendLeague(currentRoute);
    this.leagueSub = this.route.params.subscribe(
      params => {
        currentRoute = params["league"] || currentRoute
        this.loadComponents(currentRoute);
      }
    );
  };

  ngOnDestroy() {
    this.leagueSub.unsubscribe();
  };

  loadComponents(league): void {
    this.scoresComponent.loaded = false;
    this.leagueSummaryComponent.loaded = false;
    this.apiService.getData('games', { league: league }).subscribe(response =>
      this.scoresComponent.set(response.data, response.keys)
    );
    this.apiService.getData('leaguesummary', {
      league: league, exclude: ['id', 'league', 'champion'], DESC: ['win_count', 'tie_count', 'point_diff']
    }).subscribe(response => {
      this.leagueSummaryComponent.set(response.data, response.keys);
    });
  };
}
