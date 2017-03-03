import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { GetRequest } from '../shared';
import { AuthService } from './auth.service';
import { APP_SETTINGS, IAppSettings } from '../app.settings';

@Injectable()
export class ApiService {
    constructor(
        private http: Http, 
        private authService: AuthService,
        @Inject(APP_SETTINGS) private settings: IAppSettings) { }

    getData(fragment: string, query): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key of Object.keys(query)) {
            params.set(key, query[key]);
        }
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    getRequest(request: GetRequest): Observable<any> {
        let params = this.setParams(request.params);
        let requestUrl = `${this.settings.apiEndpoint}/${request.table}`;
        
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleAuthenticationError);

    }
    postData(params: {}, fragment: string): Observable<any> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(requestUrl, body, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    putData(params = {}, fragment: string): Observable<any> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}/${params['id']}`;
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.getToken() });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(requestUrl, body, options)
            .map(this.extractData)
            .catch(this.handleAuthenticationError);
    }

    deleteData(id: number, fragment: string): Observable<any> {
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}/${id}`;
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
        return Observable.throw(error || 'Server error');
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().errors || 'Server error');
    }
}

