import { Control } from '@angular/common';

const _ = require('underscore');

export class AdminValidation {
    isNumber(c: Control): {[s:string]: boolean} {
        return _.isNumber(c.value) ? null : {
            isNumber: false}
    }
}
