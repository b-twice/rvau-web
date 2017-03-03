import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-team-summary',
    templateUrl: './team-summary.component.html',
    styleUrls: ['./team-summary.component.scss'],

})
export class TeamSummaryComponent {

    private games: {}[];
    loaded: boolean = false;

    setData(games) {
        this.loaded = true;
        this.games = games;
    }
}
