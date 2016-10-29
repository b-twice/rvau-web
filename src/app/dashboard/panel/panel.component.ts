import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';
import { ScoresComponent } from '../scores';
import { LeagueSummaryComponent } from '../league-summary';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dashboard-panel',
    template: require('./panel.component.html'),
    styles: [require('./panel.component.scss')],
})
export class PanelComponent implements OnInit{

    routeSub: Subscription;

    @ViewChild(ScoresComponent)
    private scoresComponent: ScoresComponent;

    @ViewChild(LeagueSummaryComponent)
    private leagueSummaryComponent: LeagueSummaryComponent;

    constructor(
        private ds: DashboardService,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.routeSub = this.ds.routeSource$.subscribe(route => this.setData(route['league']));
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    setData(league:string): void {
        this.scoresComponent.loaded = false;
        this.leagueSummaryComponent.loaded = false;
        this.apiService.getData('games', { league: league }).subscribe(response =>
            this.scoresComponent.set(response.data, response.keys)
        );
        this.apiService.getData('leaguesummary', {
            league: league, exclude: ['id', 'league', 'champion'], DESC: ['win_count', 'tie_count', 'point_diff']
        }).subscribe(response => {
            this.leagueSummaryComponent.set(response.data, response.keys);
        });
    }
}
