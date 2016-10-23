import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../services';
import { ScoresComponent } from '../scores';
import { LeagueSummaryComponent } from '../league-summary';

@Component({
    selector: 'dashboard-panel',
    template: require('./panel.component.html'),
    styles: [require('./panel.component.scss')],
})
export class PanelComponent implements OnInit, OnChanges {

    @Input() league: string;
    @ViewChild(ScoresComponent)
    private scoresComponent: ScoresComponent;

    @ViewChild(LeagueSummaryComponent)
    private leagueSummaryComponent: LeagueSummaryComponent;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.setData();
    }

    setData() {
        this.scoresComponent.loaded = false;
        this.leagueSummaryComponent.loaded = false;
        this.apiService.getData('games', { league: this.league }).subscribe(response =>
            this.scoresComponent.set(response.data, response.keys)
        );
        this.apiService.getData('leaguesummary', {
            league: this.league, exclude: ['id', 'league', 'champion'], DESC: ['win_count', 'tie_count', 'point_diff']
        }).subscribe(response => {
            this.leagueSummaryComponent.set(response.data, response.keys);
        });
    }

    ngOnChanges() {
        this.setData();
    }
}
