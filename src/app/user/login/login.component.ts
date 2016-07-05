import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DynamicFormComponent } from '../../forms';
import { UserMetadataService } from '../';
import { AuthService } from '../../services';

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')],
    directives: [DynamicFormComponent],
    providers: []
})

export class LoginComponent implements OnInit {
    questions: any[];

    constructor(private metadata: UserMetadataService,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
        this.questions = this.metadata.getMetadata(this.metadata.loginMetadata);
    }
    formSubmit(e) {
        let form: {} = e.value
        this.authService.login(form["email"], form["password"])
    }

}