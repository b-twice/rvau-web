import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services';
const Moment = require('moment');

@Component({
    selector: 'dashboard-results',
    template: require('./results.component.html'),
    styles: [require('./results.component.scss')],
})
export class ResultsComponent implements OnInit {


    @Input() league: string;

    private leagueData: any[]; // all data for a league
    private games: any[]; // games of a specific data
    constructor(private apiService: ApiService) {
    }

    ngOnInit() {

        this.apiService.getData('games', {league: this.league}).subscribe(data => {
            this.leagueData = data.data;
            this.getMostRecentGames();
        }
        );
    };

    getMostRecentGames() {
        var gameDates = this.leagueData.map(data => Moment(data['game_date']));
        var mostRecentDate = Moment.max(gameDates);
        console.log(mostRecentDate.format("dddd, MMMM Do YYYY"));
        console.log(gameDates);
    };
    setGames():void {

    }

}
