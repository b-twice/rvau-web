import { QuestionBase } from './';

export class CheckboxQuestion extends QuestionBase<string>{
  controlType = 'checkbox';
  checked: boolean;
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}){
    super(options);
    this.options = options['options'] || [];
    this.checked = false;
  }
}