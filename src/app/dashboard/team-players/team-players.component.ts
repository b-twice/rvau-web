import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-team-players',
    templateUrl: './team-players.component.html',
    styleUrls: ['./team-players.component.scss'],
})
export class TeamPlayersComponent {

    public header:string = "Players";
    public primaryKey: string = 'player_name';
    public primaryColumn: any[];
    public error: boolean = false;
    loaded: boolean = false;

    readonly keysAlias = {
        'player_name': 'Player Name'
    };
    constructor() {}

    set(data, keys) {
        this.error = false;
        // map data vertically by column
        // i.e. team_name : pink, blue, white, orange
        this.primaryColumn = [];
        data.map(d => this.primaryColumn.push(d));
        this.loaded = true;
    };

    setError() {
        this.error = true;
        this.loaded = true;
    }
}
