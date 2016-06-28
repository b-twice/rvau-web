import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { QuestionBase } from './';
import { ValidationMessagesPipe } from './form-question.pipe'

@Component({
    selector:'df-question',
    template: `
    <div [formGroup]="form">
        <div class="form-group">
            <div [ngSwitch]="question.controlType">

                <label *ngSwitchWhen="'textbox'" [attr.for]="question.key">{{question.label}}</label>
                <input *ngSwitchWhen="'textbox'" [formControlName]="question.key"
                        [id]="question.key" [type]="question.type" class="form-control"
                        [value]="question.value">
                
                <label *ngSwitchWhen="'dropdown'" [attr.for]="question.key">{{question.label}}</label>
                <select *ngSwitchWhen="'dropdown'" [id]="question.key" [formControlName]="question.key" class="form-control" [value]="question.value">
                    <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
                </select>

                <div *ngSwitchWhen="'checkbox'" class="checkbox">
                    <label>
                        <input formControl="{{question.key}}" [id]="question.key" type="checkbox"> 
                        {{question.label}}
                    </label>
                </div>

            </div>
            <div class="errorMessage" *ngIf="!isValid" class="alert alert-danger">{{question.validationMessages | validationMessages: validationErrors}}</div>
        </div>
    </div>
    `,
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