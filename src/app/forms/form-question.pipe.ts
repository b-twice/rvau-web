import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'validationMessages' })
// Return first error from set of validation errors
// Compose validation with required last in array
export class ValidationMessagesPipe implements PipeTransform {
  transform(allMessages: any[], validatorErrors: {}) {
    let errors: string[] = Object.keys(validatorErrors);
    let errorMessage = allMessages[errors[0]];
    return errorMessage || 'Input is invalid'
  }
}
