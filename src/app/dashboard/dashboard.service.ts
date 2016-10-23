import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DashboardService {

    private leagueSource = new Subject<string>();
    private teamSource = new Subject<string>();

    leagueSource$ = this.leagueSource.asObservable();
    teamSource$ = this.teamSource.asObservable();

    // send league change
    sendLeague(league: string): void {
        this.leagueSource.next(league);
    }
    sendTeam(team:string): void {
        this.teamSource.next(team);
    }
}
