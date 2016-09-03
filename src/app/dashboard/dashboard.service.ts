import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DashboardService {

    private leagueSource = new Subject<string>(); // Rows passed to table

    leagueSource$ = this.leagueSource.asObservable();

    // send league change
    sendLeague(league: string): void {
        this.leagueSource.next(league);
    }
}
