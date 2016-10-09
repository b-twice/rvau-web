import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-summary',
    template: require('./league-summary.component.html'),
    styles: [require('./league-summary.component.scss')],
})
export class LeagueSummaryComponent {

    private columns: string[]; // pretty names
    private keys: string[]; // raw names
    private data: {}[];
    loaded: boolean = false;

    readonly keysAlias = {
        'team_name': 'Team Name',
        'win_count': 'Wins',
        'loss_count': 'Losses',
        'tie_count': 'Ties',
        'point_diff': 'Point Diff'
    };
    constructor() {}

    set(data, keys) {
        this.keys = keys;
        this.columns = keys.map(key => this.keysAlias[key]);
        this.data = data;
        this.loaded = true;
    }
}
