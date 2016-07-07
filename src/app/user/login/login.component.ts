import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DynamicFormComponent } from '../../forms';
import { UserMetadataService } from '../';
import { AuthService } from '../../services';
import { LoadingComponent } from '../../loading';

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')],
    directives: [DynamicFormComponent, LoadingComponent],
    providers: []
})

export class LoginComponent implements OnInit {
    authenticating: boolean = false;
    authenticationError: string;
    questions: any[];

    constructor(private metadata: UserMetadataService,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
        this.questions = this.metadata.getMetadata(this.metadata.loginMetadata);
        this.authService.authenticated$.subscribe(resp => {
            this.authenticating = false;
            this.authenticationError = resp["error"]
        })
    }
    formSubmit(e) {
        let form: {} = e.value
        this.authenticating = true;
        this.authenticationError = '';
        this.authService.login(form["email"], form["password"])
    }

}