import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { QuestionBase } from './question-base';
import { DynamicFormQuestionComponent } from './form-question.component';
import { QuestionControlService  } from './question-control.service';


@Component({
  selector: 'dynamic-form',
  template: `
    <form (ngSubmit)="submit()" [formGroup]="form">
        <div *ngFor="let question of questions" class="form-row">
          <df-question [question]="question" [form]="form"></df-question>
        </div>
        <div class="form-row">
            <button class="btn btn-primary btn-block" type="submit" [disabled]="!form.valid">{{submitButtonText}}</button>
        </div>
    </form>
  `,
  directives: [DynamicFormQuestionComponent, REACTIVE_FORM_DIRECTIVES],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitButtonText: string = 'Submit';
  @Output() onSubmit = new EventEmitter();

  form: FormGroup;

  constructor(private qcs: QuestionControlService) { }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  submit() {
    this.onSubmit.emit({ value: this.form.value });
  }
}
