import { Component, Input } from '@angular/core';
import { ControlGroup } from '@angular/common';
import { QuestionBase } from './';
import { ValidationMessagesPipe } from './form-question.pipe'

@Component({
    selector:'df-question',
    template: `
    <div [ngFormModel]="form">
        <div class="form-group">
            <div [ngSwitch]="question.controlType">

                <label *ngSwitchWhen="'textbox'" [attr.for]="question.key">{{question.label}}</label>
                <input *ngSwitchWhen="'textbox'" [ngControl]="question.key"
                        [id]="question.key" [type]="question.type" class="form-control">
                
                <label *ngSwitchWhen="'dropdown'" [attr.for]="question.key">{{question.label}}</label>
                <select *ngSwitchWhen="'dropdown'" [id]="question.key" [ngControl]="question.key" class="form-control">
                    <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
                </select>

                <div *ngSwitchWhen="'checkbox'" class="checkbox">
                    <label>
                        <input ngControl="{{question.key}}" [id]="question.key" type="checkbox"> 
                        {{question.label}}
                    </label>
                </div>

            </div>
            <div class="errorMessage" *ngIf="!isValid" class="alert alert-danger">{{question.validationMessages | validationMessages: validationErrors}}</div>
        </div>
    </div>
    `,
    pipes: [ValidationMessagesPipe]
})
export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: ControlGroup;
    get isValid(): boolean { 
        return (this.form.controls[this.question.key].valid || this.form.controls[this.question.key].pristine); 
    }
    get validationErrors(): {} {
        return this.form.controls[this.question.key].errors;
    }
}