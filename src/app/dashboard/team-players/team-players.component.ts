import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-team-players',
    template: require('./team-players.component.html'),
    styles: [require('./team-players.component.scss')],
})
export class TeamPlayersComponent {

    private header:string = "Players";
    private primaryKey: string = 'player_name';
    private primaryColumn: any[];
    loaded: boolean = false;

    readonly keysAlias = {
        'player_name': 'Player Name'
    };
    constructor() {}

    set(data, keys) {;
        // map data vertically by column
        // i.e. team_name : pink, blue, white, orange
        this.primaryColumn = [];
        data.map(d => this.primaryColumn.push(d));
        this.loaded = true;
    };
}
