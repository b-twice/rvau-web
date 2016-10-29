import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-team-summary',
    template: require('./team-summary.component.html'),
    styles: [require('./team-summary.component.scss')],

})
export class TeamSummaryComponent {

    private games: {}[];
    loaded: boolean = false;

    setData(games) {
        this.loaded = true;
        this.games = games;
    }
}
