import { Component, Input, OnInit }  from '@angular/core';
import { ControlGroup }              from '@angular/common';
import { QuestionBase }                 from '../question/question-base';
import { QuestionControlService }       from '../question/question-control.service';
import { DynamicFormQuestionComponent } from './form-question.component';

@Component({
  selector: 'dynamic-form',
  template: `
  <div>
    <form (ngSubmit)="onSubmit()" [ngFormModel]="form">
        <div *ngFor="let question of questions" class="form-row">
          <df-question [question]="question" [form]="form"></df-question>
        </div>
        <div class="form-row">
            <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
    </form>
    <div *ngIf="payLoad" class="form-row">
        <strong>Saved the following values</strong><br>{{payLoad}}
    </div>
  </div>
  `,
  styles: [require('./form.component.scss')],
  directives: [DynamicFormQuestionComponent],
  providers:  [QuestionControlService]
})
export class DynamicForm implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: ControlGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {  }
  ngOnInit(){
    this.form = this.qcs.toControlGroup(this.questions);
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}