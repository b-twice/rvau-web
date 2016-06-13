import { Control } from '@angular/common';

export class AdminValidation {
    isNumber(c: Control): {[s:string]: boolean} {
        return typeof(c.value) ? null : {
            isNumber: false}
    }
}
