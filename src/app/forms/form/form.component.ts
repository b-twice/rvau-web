import { Component, Input, OnInit }  from '@angular/core';
import { ControlGroup }              from '@angular/common';
import { QuestionBase }                 from '../question/question-base';
import { QuestionControlService }       from '../question/question-control.service';
import { DynamicFormQuestionComponent } from './form-question.component';
@Component({
  selector:'df',
  templateUrl: require('./form.component.html'),
  styles: [require('./form-component.scss')],
  directives: [DynamicFormQuestionComponent],
  providers:  [QuestionControlService]
})
export class DynamicForm {
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