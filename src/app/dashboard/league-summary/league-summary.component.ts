import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-summary',
    templateUrl: './league-summary.component.html',
    styleUrls: ['./league-summary.component.scss'],
})
export class LeagueSummaryComponent {

    public header:string = "Standings";
    public primaryKey: string = 'team_name';
    public primaryColumn: any[];
    public centeredColumns: {};
    public centeredKeys: string[] = [];
    public champion: string;
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
