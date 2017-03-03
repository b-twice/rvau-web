import { Component, OnInit } from '@angular/core';
import { UserMetadataService } from '../';
import { AuthService } from '../../services';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    authenticating: boolean = false;
    authenticationError: string;
    questions: any[];

    constructor(private metadata: UserMetadataService,
        private authService: AuthService) { }

    ngOnInit() {
        this.questions = this.metadata.getMetadata();
        this.authService.authenticated$.subscribe(resp => {
            this.authenticating = false;
            this.authenticationError = resp['error'];
        });
    }
    formSubmit(e) {
        let form: {} = e.value;
        this.authenticating = true;
        this.authenticationError = '';
        this.authService.login(form['email'], form['password']);
    }
}

