import {Injectable} from '@angular/core';
import { Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class AuthService {
    authenticated: boolean = false;
    auth = new Auth0({
        domain: 'bgeo.auth0.com',
        clientID: 'TPZrTRxzqYySVXNwNsokXsFL25cTD1ML',
    });
    constructor(private http: Http,
        private router: Router) {
    }

    login(email: string, password: string) {
        this.auth.login({
            connection: 'RVAU',
            responseType: 'token',
            email: email,
            password: password,
        }, (err, profile) => {
            if (err) {
                console.log("Authentication Error")
                return { error: "User could not be authenticated" }
            };
            console.log("Authentication Success");
            localStorage.setItem('jwt', profile["idToken"]);
            this.authenticated = true;
            this.router.navigate(['/admin'])
            return
        });

    }

    logout(): void {
        localStorage.removeItem('jwt');
        this.authenticated = false;
        this.router.navigate(['/'])
        return
    }

    get isAuthorized(): boolean {
        console.log("Checking authentication")
        console.log(this.authenticated);
        return this.authenticated;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().errors || 'Server error');
    }

}