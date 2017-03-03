import * as Moment from 'moment';

export function dateValidator(c): { [s: string]: boolean } {
    let validDate = Moment(c.value, 'DD/MM/YYYY').isValid();
    if (c.value && !validDate) { return { invalidDate: true }; }
}
export function characterValidator(c): { [s: string]: boolean } {
    let characterExp = /^[a-zA-Z]+$/;
    if (c.value && !characterExp.test(c.value)) { return { invalidCharacter: true }; }
}
