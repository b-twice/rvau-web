import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';
import { Subscription } from 'rxjs/Subscription';
import { TeamSummaryComponent } from '../team-summary';
import { TeamPlayersComponent } from '../team-players';

@Component({
    selector: 'dashboard-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],

})
export class TeamComponent implements OnInit, OnDestroy {

    // Routing 
    public league: string;
    public team: string;
    public data: {}[];

    // Template rendering
    public games: {}[];
    public win: number = 0;
    public loss: number = 0;
    public tie: number = 0;
    public champion: boolean = false;
    public finalist: boolean = false;

    // Team Players data
    public teamData: {}[];
    public teamKeys: string[];

    // Route sub
    public routeSub: Subscription;

    @ViewChild(TeamSummaryComponent)
    public teamSummaryComponent: TeamSummaryComponent;

    @ViewChild(TeamPlayersComponent)
    public teamPlayersComponent: TeamPlayersComponent;

    constructor(
        public ds: DashboardService,
        public apiService: ApiService
    ) { }

    ngOnInit() {
        this.routeSub = this.ds.routeSource$.subscribe(route => {
            this.setComponent(route['league'], route['team']);
        });
    };

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
    setComponent(league, team): void {
        this.apiService.getData('leagueplayers', {
            league: league, team_name: team, exclude: ['id', 'league_year', 'league_type']
        }).subscribe(response => {
            this.teamData = response.data;
            this.teamKeys = response.keys;
            this.teamPlayersComponent.set(response.data, response.keys);
        },
        error => this.teamPlayersComponent.setError()
        );
        this.team = team;
        // only set league on league change
        if (!league || league !== this.league) {
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
        this.games = this.data.filter(game => game['away_team'] === this.team || game['home_team'] === this.team);
        let summaryList = [];
        this.games.forEach(game => {
            let summary = { date: game['game_date'], result: '', opponent: '', teamScore: 0, opponentScore: 0 };

            // final results
            if (game['game_type'] === 'Final') {
                if (game['away_team'] === this.team && game['away_score'] > game['home_score']) {
                    this.champion = true;
                }
                else if (game['home_team'] === this.team && game['home_score'] > game['away_score']) {
                    this.champion = true;
                }
                else {
                    this.finalist = true;
                }
            }
            if (game['game_type'] !== 'Season') { return; }
            // season results
            if (game['away_team'] === this.team) {
                if (game['away_score'] > game['home_score']) {
                    this.win++;
                    summary.result = 'win';
                }
                else if (game['away_score'] < game['home_score']) {
                    this.loss++;
                    summary.result = 'loss';
                }
                else {
                    this.tie++;
                    summary.result = 'tie';
                }
                summary.teamScore = game['away_score'];
                summary.opponentScore = game['home_score'];
                summary.opponent = game['home_team'];
            }
            else {
                if (game['home_score'] > game['away_score']) {
                    this.win++;
                    summary.result = 'win';
                }
                else if (game['home_score'] < game['away_score']) {
                    this.loss++;
                    summary.result = 'loss';
                }
                else {
                    this.tie++;
                    summary.result = 'tie';
                }
                summary.teamScore = game['home_score'];
                summary.opponentScore = game['away_score'];
                summary.opponent = game['away_team'];
            }
            summaryList.push(summary);
        });
        this.teamSummaryComponent.setData(summaryList);
    }

    resetProperties() {
        this.games = [];
        this.win = 0;
        this.loss = 0;
        this.tie = 0;
        this.champion = false;
        this.finalist = false;
    }
}
