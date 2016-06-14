import { Injectable }   from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common';
import { QuestionBase } from './question-base';
const _ = require('underscore');
@Injectable()
export class QuestionControlService {
  constructor(private fb:FormBuilder){ }

  toControlGroup(questions:QuestionBase<any>[] ) {
    let group = {};
    
    questions.forEach(question => {
      group[question.key] = _.IsEmpty(question.validators) === false ? [question.value || '', Validators.compose(question.validators)] : [question.value || ''];
    });
    return this.fb.group(group);
  }
}