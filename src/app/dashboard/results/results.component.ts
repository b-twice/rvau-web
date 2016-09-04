import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services';
const Moment = require('moment');
const _ = require('lodash');

@Component({
    selector: 'dashboard-results',
    template: require('./results.component.html'),
    styles: [require('./results.component.scss')],
})
export class ResultsComponent implements OnInit {


    @Input() league: string;
    private games: {}[]; // all games by season type and date, e.g. games['season']['04/2015/16']
    private activeDate: string; // date of active games e.g. 05/10/2016
    private activeSeasonType: string; // season of active games e.g. preseason

    //dropdown
    private dayList: string[] = []; // array of game days e.g. Preason Game 1
    private activeDay: string; // day set in nav

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {

        this.apiService.getData('games', { league: this.league }).subscribe(data => {
            this.setGames(data.data);
        }
        );
    };

    setGames(data): void {
        this.games = _.groupBy(data, data => data['game_type']);
        let gameList = [];
        _.keys(this.games).map(key => {
            this.games[key] = _.groupBy(this.games[key], data => {
                return data['game_date'];
            })
            _.keys(this.games[key]).map((game_type, i) => gameList.push(`${key} Game ${i + 1}`) )
        });
        this.dayList = gameList.sort();
        this.activeDay = this.dayList[this.dayList.length - 1];
        this.getGames(this.activeDay);


    };
    setActiveGames(e): void {
        this.getGames(e.value);
    };

    getGames(activeDay) {
        // dayList stores a list of games, these need to be decomposed to access games
        let dayParts = activeDay.split(" ");
        let season = dayParts[0];
        let dayIdx = dayParts[2] - 1;
        this.activeSeasonType = season;
        this.activeDate = _.keys(this.games[season])[dayIdx]
        this.activeDay = activeDay;
    }

}
