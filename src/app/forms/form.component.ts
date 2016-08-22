import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './question-base';
import { QuestionControlService  } from './question-control.service';


@Component({
  selector: 'dynamic-form',
  template: `
    <form (ngSubmit)="submit()" [formGroup]="form">
        <div *ngFor="let question of questions" class="form-row">
          <df-question [question]="question" [form]="form"></df-question>
        </div>
        <div class="form-row">
            <button class="btn btn-success btn-block" type="submit" [disabled]="!form.valid">{{submitButtonText}}</button>
        </div>
    </form>
  `,
})
export class FormComponent implements OnInit {
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
