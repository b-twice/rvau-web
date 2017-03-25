import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'dashboard',
  template: `
    <dashboard-metabar  [title]='title' [currentTeam]='currentTeam' [currentLeague]='currentLeague'></dashboard-metabar>
    <router-outlet (activate)='onActivate($event)' (deactivate)='onDeactivate($event)'></router-outlet>
    `,
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent {

    public title: string = 'Richmond Ultimate Scores';
    public currentLeague: string;
    public currentTeam: string;
    routeSub: Subscription;

    constructor(
        public ds: DashboardService,
        public route: ActivatedRoute
        ) {
    }


  onActivate(evt) {
		
    let route = evt.route;
    this.routeSub = this.route.firstChild.params.subscribe(params => {
      let league = params["league"];
      let team = params["team"];
      this.currentTeam = !!team ? team : "Teams"
      if (league !== this.currentLeague) {
          this.currentLeague = league
      }
      this.ds.sendRoute(league, team);
  })
  }

  onDeactivate(evt) {
    this.routeSub.unsubscribe();
  }
}
