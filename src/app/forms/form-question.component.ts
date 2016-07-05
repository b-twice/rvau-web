import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { QuestionBase } from './';
import { ValidationMessagesPipe } from './form-question.pipe'

@Component({
    selector: 'df-question',
    template: require('./form-question.component.html'),
    styles: [require('./form-question.component.scss')],
    directives: [REACTIVE_FORM_DIRECTIVES],
    pipes: [ValidationMessagesPipe]
})
export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    get isValid(): boolean {
        return (this.form.controls[this.question.key].valid || this.form.controls[this.question.key].pristine);
    }
    get validationErrors(): {} {
        return this.form.controls[this.question.key].errors;
    }
}