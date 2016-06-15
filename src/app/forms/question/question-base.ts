import { Validators } from '@angular/common';

export class QuestionBase<T>{
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    validators: any[];
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        validators?: Array<Function>
    } = { } )
    {   
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.validators = options.validators || [];
        if (this.required === true) {
            this.validators.push(Validators.required);
        }
    }
}
