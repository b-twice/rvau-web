import { Component, OnInit } from '@angular/core';

import { ILeague } from '../interfaces';
import { LeagueService } from '../services';

@Component({
  selector: 'my-home',
  providers: [LeagueService],
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {
  errorMessage: string;
  leagues: ILeague[];

  constructor(private _leagueService: LeagueService) {
  }

  ngOnInit() {
    this._leagueService.getLeagues()
          .subscribe(
            leagues => this.leagues = leagues,
            error =>  this.errorMessage = <any>error);
  }

}
