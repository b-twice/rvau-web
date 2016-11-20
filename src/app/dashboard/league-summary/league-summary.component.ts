import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-summary',
    template: require('./league-summary.component.html'),
    styles: [require('./league-summary.component.scss')],
})
export class LeagueSummaryComponent {

    private header:string = "Standings";
    private primaryKey: string = 'team_name';
    private primaryColumn: any[];
    private centeredColumns: {};
    private centeredKeys: string[] = [];
    private champion: string;
    loaded: boolean = false;

    readonly keysAlias = {
        'team_name': 'Team Name',
        'champion': 'Champion',
        'win_count': 'Wins',
        'loss_count': 'Losses',
        'tie_count': 'Ties',
        'point_diff': 'Point Diff'
    };
    constructor() {}

    set(data, keys) {
        // map data vertically by column
        // i.e. team_name : pink, blue, white, orange
        this.centeredColumns = {};
        this.primaryColumn = [];
        this.champion = '';
        this.centeredKeys = keys.filter(k => k !== this.primaryKey && k !== 'champion');
        data.map(d =>  
            keys.map(k => {
                var cellValue = d[k];
                if (k === this.primaryKey) {
                    this.primaryColumn.push(cellValue);
                }
                else {
                    this.setKey(this.centeredColumns, k, []);
                    this.centeredColumns[k].push(cellValue);
                }

		if (k === 'champion' && !!cellValue){
		    this.champion = d.team_name;		}
            })
	    
        )
        this.loaded = true;
    };

    setKey(dict, key, value) {
        if (!(dict.hasOwnProperty(key))) {
            dict[key] = value;
        }
    };
}
