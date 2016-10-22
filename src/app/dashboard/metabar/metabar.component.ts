import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private name: string = 'Richmond Ultimate Scores';
  private leagues: string[];
  private latestLeague: string = '2016 Spring';
  currentRoute: string;
  leagueSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private ds: DashboardService) {
  }

  ngOnInit() {
    this.apiService.getData('leagues', []).subscribe(data => {
      this.leagueSubscription = this.route.params.subscribe(params => {
        // TODO: do not hard code latest league
        this.currentRoute = params['league'] || this.latestLeague;
        this.leagues = data.data.map(league => league.league);
        this.ds.sendLeague(this.currentRoute);
      });
    });
  }
  ngOnDestroy() {
    this.leagueSubscription.unsubscribe();
  }
  onSelect(event): void {
    let leagueRoute: string = event.value;
    this.router.navigate([`/league`, leagueRoute]);
  };
}
