import { Component } from '@angular/core';
const _ = require('lodash');
const Moment = require('moment');


@Component({
    selector: 'dashboard-scores',
    template: require('./scores.component.html'),
    styles: [require('./scores.component.scss')],
})
export class ScoresComponent {

    loaded: boolean = false;
    private games: {}[]; // all games by season type and date, e.g. games['season']['04/2015/16']

    // dropdown
    private dayList: string[] = []; // array of game days e.g. Preason Game 1
    private activeDay: string;
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
