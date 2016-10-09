import { Component } from '@angular/core';
const _ = require('lodash');

@Component({
    selector: 'dashboard-scores',
    template: require('./scores.component.html'),
    styles: [require('./scores.component.scss')],
})
export class ScoresComponent {

    loaded: boolean = false;
    private games: {}[]; // all games by season type and date, e.g. games['season']['04/2015/16']
    private activeDate: string; // date of active games e.g. 05/10/2016
    private activeSeasonType: string; // season of active games e.g. preseason

    // dropdown
    private dayList: string[] = []; // array of game days e.g. Preason Game 1
    private activeDay: string; // day set in nav

    constructor() {
    }

    set(data, keys): void {
        this.loaded = false;
        // Group Games by Season => Date
        this.games = _.groupBy(data, d => d['game_type']);
        let gameList = [];
        _.keys(this.games).map(key => {
            this.games[key] = _.groupBy(this.games[key], d => {
                return d['game_date'];
            });
            _.keys(this.games[key]).map((game_type, i) => gameList.push(`${key} Game ${i + 1}`));
        });
        this.dayList = gameList.sort();
        this.activeDay = this.dayList[this.dayList.length - 1];
        this.getGames(this.activeDay);
        this.loaded = true;
    };

    setActiveGames(e): void {
        this.getGames(e.value);
    };

    getGames(activeDay) {
        // dayList stores a list of games, these need to be decomposed to access games
        let dayParts = activeDay.split(' ');
        let season = dayParts[0];
        let dayIdx = dayParts[2] - 1;
        this.activeSeasonType = season;
        this.activeDate = _.keys(this.games[season])[dayIdx];
        this.activeDay = activeDay;
    }

}
