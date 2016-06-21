import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ControlGroup } from '@angular/common';
import { QuestionBase,
         DynamicFormQuestionComponent,
         QuestionControlService  } from './';


@Component({
  selector: 'dynamic-form',
  template: `
    <form (ngSubmit)="submit()" [ngFormModel]="form">
        <div *ngFor="let question of questions" class="form-row">
          <df-question [question]="question" [form]="form"></df-question>
        </div>
        <div class="form-row">
            <button class="btn btn-primary btn-block" type="submit" [disabled]="!form.valid">{{submitButtonText}}</button>
        </div>
    </form>
  `,
  directives: [DynamicFormQuestionComponent],
  providers:  [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitButtonText: string;
  @Output() onSubmit = new EventEmitter();

  form: ControlGroup;

  constructor(private qcs: QuestionControlService) {  }
  ngOnInit(){
    this.form = this.qcs.toControlGroup(this.questions);
  }
  submit() {
    console.log(this.form)
     this.onSubmit.emit({value: this.form.value})
  }
}