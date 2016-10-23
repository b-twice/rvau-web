import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'dashboard-main',
  template: `
    <dashboard-panel *ngIf="teamRoute === false" [league]="league"></dashboard-panel>
    <dashboard-team *ngIf="teamRoute === true" [league]="league" [team]="team"></dashboard-team>
    `,

})
export class MainComponent implements OnInit, OnDestroy {

  private defaultLeagueRoute = "2016 Summer"
  private teamRoute: boolean;
  private league: string;
  private team: string;
  leagueSub: Subscription;

  constructor(
    private ds: DashboardService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
      // First time component loaded send route to metabar
      // since metabar can't see child route params
      this.leagueSub = this.route.params.subscribe(
          params => {
              let leagueRoute = params["league"] || this.defaultLeagueRoute;
              let teamRoute = params["team"];
              this.ds.sendLeague(leagueRoute);
              this.ds.sendTeam(teamRoute);
              this.league = leagueRoute;
              if (teamRoute) {
                  this.team = teamRoute;
                  this.teamRoute = true;
                  return;
              }
              this.teamRoute = false;
          }
      );
  }

  ngOnDestroy() {
    this.leagueSub.unsubscribe();
  };

}
