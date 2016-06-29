import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormResponse } from '../models';

@Injectable()
export class ApiService {
    private apiUrl = 'http://localhost:5000/rvau/api/';

    constructor(private http: Http) { }

    getData (fragment:string): Observable<any> {
        let requestUrl = this.apiUrl + fragment
        return this.http.get(requestUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    addData(params: {}, fragment:string ): Observable<any> {
        let requestUrl = this.apiUrl + fragment
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(requestUrl, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

