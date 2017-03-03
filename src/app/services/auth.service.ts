import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { tokenNotExpired } from 'angular2-jwt';

import * as auth0 from 'auth0-js';
// declare var auth0: any;
// Avoid name not found warnings


@Injectable()
export class AuthService {
    authenticated: boolean = false;
    private auth = new auth0.WebAuth({
        domain: 'bgeo.auth0.com',
        clientID: 'TPZrTRxzqYySVXNwNsokXsFL25cTD1ML',
        responseType: 'token id_token'
    });
    private authenticatedSource = new Subject<any[]>();
    authenticated$ = this.authenticatedSource = new Subject<any[]>();

    constructor(private http: Http,
        private router: Router) {
    }
    login(email: string, password: string) {
        return this.auth.login({
            realm: 'RVAU',
            email: email,
            password: password,
        }, (err, authResult) => {
            if (err) {
                this.authenticationResponse({error: 'User could not be authenticated' });
            }
            if (authResult && authResult.idToken && authResult.accessToken) {
                this.setUser(authResult);
                this.authenticated = true;
                this.router.navigate(['/admin']);
            }
        });
    }

    logout(): void {
        localStorage.removeItem('jwt');
        this.authenticated = false;
        this.router.navigate(['/']);
        return;
    }

    private setUser(authResult): void {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    }

    get isAuthorized(): boolean {
        this.authenticated = tokenNotExpired('jwt');
        return this.authenticated;
    }

    getToken(): any{
        return localStorage.getItem('jwt');
    }

    authenticationResponse(response): void {
        this.authenticatedSource.next(response);
    }
}
