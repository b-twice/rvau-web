import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { League } from '../models/league';

@Injectable()
export class LeagueService {
    private leagueUrl = 'http://localhost:5000/rvau/api/leagues';

    constructor(private http: Http) { }

    getLeagues (): Observable<League[]> {
        return this.http.get(this.leagueUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    

    addLeague(params: League): Observable<League> {
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.leagueUrl, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
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

