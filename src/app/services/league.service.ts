import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ILeague } from '../interfaces/league';

@Injectable()
export class LeagueService {
    private _leagueUrl = 'leagues.json';

    constructor(private _http: Http) { }

    getLeagues(): Observable<ILeague[]> {
        return this._http.get(this._leagueUrl)
            .map((response: Response) => <ILeague[]> response.json())
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

