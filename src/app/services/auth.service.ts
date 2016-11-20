import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { tokenNotExpired } from 'angular2-jwt';


declare var Auth0: any;
@Injectable()
export class AuthService {
    authenticated: boolean = false;
    private auth = new Auth0({
        domain: 'bgeo.auth0.com',
        clientID: 'TPZrTRxzqYySVXNwNsokXsFL25cTD1ML'
    });
    private authenticatedSource = new Subject<any[]>();
    authenticated$ = this.authenticatedSource = new Subject<any[]>();

    constructor(private http: Http,
        private router: Router) {
    }
    login(email: string, password: string) {
        return this.auth.login({
            connection: 'RVAU',
            responseType: 'token',
            email: email,
            password: password,
        }, (err, profile) => {
            if (err) {
                this.authenticationResponse({error: 'User could not be authenticated' });
            }
            localStorage.setItem('jwt', profile['idToken']);
            this.authenticated = true;
            this.router.navigate(['/admin']);
            return;
        });
    }

    logout(): void {
        localStorage.removeItem('jwt');
        this.authenticated = false;
        this.router.navigate(['/']);
        return;
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
