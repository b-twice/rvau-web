import { FormControl } from '@angular/forms';
export function emailValidator(control: FormControl): { [key: string]: any } {
    let emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value && !emailRegexp.test(control.value)) { return { invalidEmail: true }; }
}
