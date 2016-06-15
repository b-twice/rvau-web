import { Component, Input } from '@angular/core';
import { ControlGroup }     from '@angular/common';
import { QuestionBase }     from '../question/question-base';

@Component({
    selector:'df-question',
    template: `
    <div [ngFormModel]="form">
        <label [attr.for]="question.key">{{question.label}}</label>
        <div [ngSwitch]="question.controlType">
            <input *ngSwitchWhen="'textbox'" [ngControl]="question.key"
                    [id]="question.key" [type]="question.type">
            <select [id]="question.key" *ngSwitchWhen="'dropdown'" [ngControl]="question.key">
                <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
            </select>
        </div>
        <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
    </div>
    `
    // templateUrl: require('./form-question.component.html')
})
export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: ControlGroup;
    get isValid() { 
        console.log(this.form.controls[this.question.key]);
        return this.form.controls[this.question.key].valid; 
    }
}