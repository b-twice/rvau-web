import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'dashboard-metabar',
  template: require('./metabar.component.html'),
  styles: [require('./metabar.component.scss')],
})
export class MetabarComponent {
  private name = 'Richmond Ultimate';
  private leagues: string[] = [];
  currentRoute: string;
  leagueSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private ds: DashboardService) {
  }

  ngOnInit() {

    this.leagueSubscription = this.route.params.subscribe(params => {
      // TODO: do not hard code latest league
      this.currentRoute = params['league'] || '2016 Spring';
      this.ds.sendLeague(this.currentRoute);
    });
    this.apiService.getData("leagues", []).subscribe(data => {
        this.leagues = data.data.map(league => league.league);
    })
  }
  ngOnDestroy() {
    this.leagueSubscription.unsubscribe();
  }
  onSelect(event): void {
    var leagueRoute: string = event.value;
    this.router.navigate([`/league`, leagueRoute]);
  };
}
