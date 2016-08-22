import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../';

@Component({
    selector: 'df-question',
    template: require('./form-question.component.html'),
    styles: [require('./form-question.component.scss')],
})
export class FormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    get isValid(): boolean {
        return (this.form.controls[this.question.key].valid || this.form.controls[this.question.key].pristine);
    }
    get validationErrors(): {} {
        return this.form.controls[this.question.key].errors;
    }
}
