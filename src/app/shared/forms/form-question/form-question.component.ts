import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../';

@Component({
    selector: 'df-question',
    templateUrl: './form-question.component.html',
    styleUrls: ['./form-question.component.scss'],
})
export class FormQuestionComponent {
    @Input() questionLabel: boolean = true;
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    get isValid(): boolean {
        return (this.form.controls[this.question.key].valid || this.form.controls[this.question.key].pristine);
    }
    get validationErrors(): {} {
        return this.form.controls[this.question.key].errors;
    }
}
