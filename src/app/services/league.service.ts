import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { League } from '../models/league';

@Injectable()
export class LeagueService {
    private leagueUrl = 'leagues.json';

    constructor(private http: Http) { }

    getLeagues(): Observable<League[]> {
        return this.http.get(this.leagueUrl)
            .map((response: Response) => <League[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    // getProduct(id: number): Observable<ILeague> {
    //     return this.getProducts()
    //         .map((leagues: ILeague[]) => leagues.find(p => p. === id));
    // }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

