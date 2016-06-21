import { Component, OnInit } from '@angular/core';

import { League } from '../models';
import { LeagueService } from '../services';

@Component({
  selector: 'my-home',
  providers: [LeagueService],
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {
  errorMessage: string;
  leagues: Array<League>;

  constructor(private leagueService: LeagueService) {
  }

  ngOnInit() {
    this.leagueService.getLeagues()
          .subscribe(
            leagues => this.leagues = leagues,
            error =>  this.errorMessage = <any>error);
  }

}
