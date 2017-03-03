import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../';
import { QuestionControlService  } from '../question-control.service';


@Component({
  selector: 'dynamic-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() questionLabel: boolean = true; 
  @Input() legend: string;
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
