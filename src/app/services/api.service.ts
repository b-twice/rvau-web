import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class ApiService {
    private apiUrl = 'http://localhost:5000/rvau/api';

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getData(fragment: string, authorized?: boolean): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}`
        if (authorized) {
            return this.authHttp.get(requestUrl)
                .map(this.extractData)
                .catch(this.handleAuthenticationError);
        }
        return this.http.get(requestUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postData(params: {}, fragment: string): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}`
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(requestUrl, body, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    putData(params = {}, fragment: string): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}/${params["id"]}`
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.put(requestUrl, body, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    deleteData(id: number, fragment: string): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}/${id}`
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.delete(requestUrl, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleAuthenticationError(error: Response) {
        console.log(error.json()); 
        return Observable.throw(error.json() || 'Server error');
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().errors || 'Server error');
    }
}

