import { Injectable } from '@angular/core';
import { QuestionBase,
         TextboxQuestion} from '../shared/forms';
import { emailValidator } from './user.validation';

@Injectable()
export class UserMetadataService {
    loginMetadata: QuestionBase<any>[] = [
        new TextboxQuestion({
            key: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            validators: [emailValidator],
            validationMessages: {
                'invalidEmail': 'Not a valid email address',
                'required': 'Email is required'
            },
            order: 1
        }),
        new TextboxQuestion({
            key: 'password',
            label: 'Password',
            placeholder: 'Password',
            type: 'password',
            required: true,
            order: 2
        })
    ];
    getMetadata() {
        return this.loginMetadata.sort((a, b) => a.order - b.order);
    }
}
