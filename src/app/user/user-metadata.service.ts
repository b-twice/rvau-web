import { Injectable } from '@angular/core';
import { QuestionBase,
         TextboxQuestion} from '../forms';
import { emailValidator, passwordValidator } from '../validation/user.validation';

@Injectable()
export class UserMetadataService {
    loginMetadata: QuestionBase<any>[] = [
        new TextboxQuestion({
            key: 'email',
            label: 'Email',
            type: 'email',
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
            type: 'password',
            required: true,
            order: 2
        })
    ];
    getMetadata(metadata) {
        return metadata.sort((a, b) => a.order - b.order);
    }
}