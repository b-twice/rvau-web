import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services';



@Component({
    selector: 'dashboard-metabar',
    template: require('./metabar.component.html'),
    styles: [require('./metabar.component.scss')],
})
export class MetabarComponent implements OnInit {

    @Input() title: string;
    @Input() currentLeague: string;
    @Input() currentTeam: string;
    private leagues: string[];
    private teams: string[];

    constructor(
        private apiService: ApiService,
        private router: Router
        ) {
    }

    ngOnInit() {
        this.apiService.getData('leagues', []).subscribe(leagueData => {
            this.leagues = leagueData.data.map(league => league.league);
            this.updateMetabar(this.currentLeague);
        });
    }

    onLeagueSelect(event): void {
        let leagueRoute: string = event.value;
        this.router.navigate([`/league`, leagueRoute]);
        this.updateMetabar(leagueRoute);
        this.currentLeague = leagueRoute
    };
    onTeamSelect(event): void {
        let teamRoute: string = event.value;
        // Ignore dropdown title before team selected
        if (teamRoute === 'Teams') {return;}
        this.router.navigate(['/league', this.currentLeague, 'team', teamRoute]);
    };

    updateMetabar(route: string): void {
        this.apiService.getData('leaguesummary', {
            league: route, exclude: ['id', 'league', 'champion', 'win_count', 'loss_count', 'tie_count', 'point_diff']
        }).subscribe(teamData => {
            this.teams = teamData.data.map(teams => teams.team_name);
        });
    }

}
