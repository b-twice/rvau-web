import { Control } from '@angular/common';
import * as Moment from 'Moment';


export function dateValidator(c: Control): { [s: string]: boolean } {
    let validDate = Moment(c.value, 'DD/MM/YYYY').isValid();
    if (c.value && !validDate) return { invalidDate: true };
}
export function characterValidator(c: Control): { [s: string]: boolean } {
    let characterExp = /^[a-zA-Z]+$/;
    if (c.value && !characterExp.test(c.value)) return { invalidCharacter: true };

}

export function emailValidator(control: Control): { [key: string]: any } {
    var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value && !emailRegexp.test(control.value)) return { invalidEmail: true };
}