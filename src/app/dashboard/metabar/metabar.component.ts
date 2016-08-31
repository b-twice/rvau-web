import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';



@Component({
  selector: 'dashboard-metabar',
  template: require('./metabar.component.html'),
  styles: [require('./metabar.component.scss')],
})
export class MetabarComponent {
  name = 'Richmond Ultimate';
  leagues: string[] = [];
  currentRoute: string = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.apiService.getData("leagues", []).subscribe(data => {
      this.leagues = data.data.map(league => league.league);
    })
  }
  onSelect(event): void {
    var leagueRoute: string = event.target;
    this.router.navigate([`/`]);
  };
}
