import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DashboardService {

    private routeSource = new Subject<{}>();

    routeSource$ = this.routeSource.asObservable();

    // send route change
    sendRoute(league, team): void {
        this.routeSource.next({league:league, team:team});
    }
}
