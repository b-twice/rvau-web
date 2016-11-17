import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GetRequest } from '../shared';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {
    private apiUrl: string = 'http://api.bgeo.io/rvau/api';

    constructor(
        private http: Http, 
        private authService: AuthService) { }

    getData(fragment: string, query): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key of Object.keys(query)) {
            params.set(key, query[key]);
        }
        let requestUrl = `${this.apiUrl}/${fragment}`;
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    getRequest(request: GetRequest): Observable<any> {
        let params = this.setParams(request.params);
        let requestUrl = `${this.apiUrl}/${request.table}`;
        
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleAuthenticationError);

    }
    postData(params: {}, fragment: string): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}`;
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(requestUrl, body, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    putData(params = {}, fragment: string): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}/${params['id']}`;
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(requestUrl, body, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    deleteData(id: number, fragment: string): Observable<any> {
        let requestUrl = `${this.apiUrl}/${fragment}/${id}`;
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() });;
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(requestUrl, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private setParams(query: {}): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (let key of Object.keys(query)) {
            params.set(key, query[key]);
        }
        return params;
    }
    private handleAuthenticationError(error: Response) {
        console.log(error);
        return Observable.throw(error || 'Server error');
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().errors || 'Server error');
    }
}

