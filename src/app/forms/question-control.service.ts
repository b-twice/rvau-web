import { Injectable }   from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { QuestionBase } from './';
const _ = require('lodash');

@Injectable()
export class QuestionControlService {

  constructor( private fb: FormBuilder ){ }

  toControlGroup(questions: QuestionBase<any>[], customControl?: Array<any> ) {
    let group = {};
    // Set control group and validation. Question validation stored in metadata
    questions.forEach(question => {
      group[question.key] = _.isEmpty(question.validators) ? [question.value || ''] : [question.value || '', Validators.compose(question.validators)];
    });
    if (!_.isEmpty(customControl)) {
      customControl.forEach(c => {
        group[c.key] = c.value
      })
    }
    return this.fb.group(group);
  }
}