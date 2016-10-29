import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { TeamSummaryComponent } from '../team-summary';

@Component({
    selector: 'dashboard-team',
    template: require('./team.component.html'),
    styles: [require('./team.component.scss')],

})
export class TeamComponent implements OnInit, OnDestroy {

    // Routing 
    private league: string;
    private team: string;
    private data: {}[];

    // Template rendering
    private games: {}[];
    private win: number = 0;
    private loss: number = 0;
    private tie: number = 0;

    // Route sub
    private routeSub: Subscription;

    @ViewChild(TeamSummaryComponent)
    private teamSummaryComponent: TeamSummaryComponent;

    constructor(
        private ds: DashboardService,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.routeSub = this.ds.routeSource$.subscribe(route => {
            this.team = route['team'];
            this.setLeague(route['league'])
        });
    };

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
    setLeague(league): void {
        // only set league on league change
        if (!league || league != this.league) {
            this.apiService.getData('games', {
                league: league, exclude: ['id', 'league_year', 'league_type'], ASC: ['game_date']
            }).subscribe(response => {
                this.setData(response.data, response.keys);
            });
        }
        else {
            this.teamSummaryComponent.loaded = false;
            this.setGames();
        }
        this.league = league;
    }

    setData(data, keys) {
        this.data = data;
        this.setGames();
    }

    setGames() {
        this.resetProperties();
        this.games = this.data.filter(game => game['away_team'] === this.team || game['home_team'] === this.team)
        let summaryList = [];
        this.games.forEach(game => {
            let summary = {date: game['game_date'], result:'', teamScore:0, opponentScore:0}
            if (game['away_team'] === this.team) {
                if (game['away_score'] > game['home_score']) {
                    this.win++
                    summary.result = "win"
                } 
                else if (game['away_score'] < game['home_score']) {
                    this.loss++
                    summary.result = "loss"
                }
                else {
                    this.tie++
                    summary.result = "tie"
                }
                summary.teamScore = game['away_score'];
                summary.opponentScore = game['home_score'];
            }
            else {
                if (game['home_score'] > game['away_score']) {
                    this.win++
                    summary.result = "win"
                } 
                else if (game['home_score'] < game['away_score']) {
                    this.loss++
                    summary.result = "loss"
                }
                else {
                    this.tie++
                    summary.result = "tie"
                }
                summary.teamScore = game['home_score'];
                summary.opponentScore = game['away_score'];
            }
            summaryList.push(summary);
        })
        this.teamSummaryComponent.setData(summaryList);
    }

    resetProperties() {
        this.games = []
        this.win = 0;
        this.loss = 0;
        this.tie = 0;
    }
}
