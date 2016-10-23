import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'dashboard-metabar',
  template: require('./metabar.component.html'),
  styles: [require('./metabar.component.scss')],
})
export class MetabarComponent implements OnInit, OnDestroy {
  private currentLeague: string;
  private name: string = 'Richmond Ultimate Scores';
  private teams: string[];
  private teamDefault: string[] = ['Teams'] // hacky way to reset detection
  private leagues: string[];
  leagueSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private ds: DashboardService) {
  }

  ngOnInit() {
    this.apiService.getData('leagues', []).subscribe(leagueData => {
        this.leagues = leagueData.data.map(league => league.league);
        this.updateMetabar(this.currentLeague);
    });
    // Child routes hold activated route, i.e.league/2016 Summer
    // First time child route is loaded, receive current league
    this.leagueSubscription = this.ds.leagueSource$.subscribe(league => 
       this.currentLeague = league
    )
  }
  ngOnDestroy() {
    this.leagueSubscription.unsubscribe();
  }

  onLeagueSelect(event): void {
    let leagueRoute: string = event.value;
    this.router.navigate([`/league`, leagueRoute]);
    this.updateMetabar(leagueRoute);
    this.currentLeague = leagueRoute
  };
  onTeamSelect(event): void {
    let teamRoute: string = event.value;
    this.router.navigate(['/league', this.currentLeague, 'team', teamRoute]);
  };

  updateMetabar(route: string): void {
      this.apiService.getData('leaguesummary', {
        league: route, exclude: ['id', 'league', 'champion', 'win_count', 'loss_count', 'tie_count', 'point_diff']
      }).subscribe(teamData => {
        this.teamDefault = ["Teams"];
        this.teams = teamData.data.map(teams => teams.team_name);
      });
  }
}
