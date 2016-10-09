import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './';
const _ = require('lodash');

@Injectable()
export class QuestionControlService {

  constructor() { }

  toFormGroup(questions: QuestionBase<any>[], customControl?: Array<any>) {
    let group: any = {};
    // Set control group and validation. Question validation stored in metadata
    questions.forEach(question => {
      group[question.key] = _.isEmpty(question.validators) ?
      new FormControl(question.value || '') :
      new FormControl(question.value || '', Validators.compose(question.validators));
    });
    if (!_.isEmpty(customControl)) {
      customControl.forEach(c => {
        group[c.key] = new FormControl(c.value || '');
      });
    }
    return new FormGroup(group);
  }
}
