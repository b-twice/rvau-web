import { Pipe, PipeTransform } from '@angular/core';
const _ = require('lodash');

@Pipe({ name: 'validationMessages' })
// Return first error from set of validation errors
export class ValidationMessagesPipe implements PipeTransform { 
  transform(allMessages:any[], validatorErrors: {}) {
    let errors: string[] = Object.keys(validatorErrors);
    let errorMessage = allMessages[errors[0]]
    return allMessages[errors[0]] || 'Input is invalid'
  }
}