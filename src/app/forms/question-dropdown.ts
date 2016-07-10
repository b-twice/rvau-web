import { QuestionBase } from './';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: any[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
