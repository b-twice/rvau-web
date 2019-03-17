import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';
import { ScoresComponent } from '../scores';
import { LeagueSummaryComponent } from '../league-summary';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit{

    routeSub: Subscription;

    @ViewChild(ScoresComponent)
    public scoresComponent: ScoresComponent;

    @ViewChild(LeagueSummaryComponent)
    public leagueSummaryComponent: LeagueSummaryComponent;

    constructor(
        public ds: DashboardService,
        public route: ActivatedRoute,
        public apiService: ApiService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.setData(params['league'])
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    setData(league:string): void {
        this.scoresComponent.loaded = false;
        this.leagueSummaryComponent.loaded = false;
        this.apiService.getData('games', { league: league, game_type: 'Season' }).subscribe(response =>
            this.scoresComponent.set(response.data, response.keys)
        );
        this.apiService.getData('leaguesummary', {
            league: league, exclude: ['id', 'league'], DESC: ['win_count', 'tie_count', 'point_diff']
        }).subscribe(response => {
            this.leagueSummaryComponent.set(response.data, response.keys);
        });
    }
}
