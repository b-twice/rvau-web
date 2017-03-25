import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as Moment from 'moment';


@Component({
    selector: 'dashboard-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {

    loaded: boolean = false;
    public games: {}; // all games by season type and date, e.g. games['season']['04/2015/16']

    // dropdown
    public dayList: string[] = []; // array of game days e.g. Preason Game 1
    public activeDay: string;
    constructor() {
    }

    set(data, keys): void {
        this.loaded = false;
        // Group Games by Season => Date
        this.games = _.groupBy(data, d => d['game_date']);
        Object.keys(this.games).forEach(g => {
            this.games[Moment(g).format('dddd, MMMM DD')] = this.games[g];
            delete this.games[g];
        });
        this.dayList = Object.keys(this.games).sort();
        this.activeDay = this.dayList[this.dayList.length - 1];
        this.getGames(this.activeDay);
        this.loaded = true;
    };

    setActiveGames(e): void {
        this.getGames(e.value);
    };

    getGames(activeDay) {
        this.activeDay = activeDay;
    }

}
