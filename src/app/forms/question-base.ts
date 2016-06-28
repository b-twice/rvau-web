import { Validators } from '@angular/common';

export class QuestionBase<T>{
    value: any;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    validators: any[];
    validationMessages: {[key:string] :string};
    constructor(options: {
        value?: any,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        validators?: Array<Function>,
        validationMessages?: {[key:string] : string}
    } = { } )
    {   
        this.value = options.value || '';
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.validationMessages = options.validationMessages || {};
        this.validators = options.validators || [];
        if (this.required === true) {
            this.validators.push(Validators.required);
        }
    }
}