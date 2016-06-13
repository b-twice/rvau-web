import { Component } from '@angular/core';
import { CORE_DIRECTIVES,
         FORM_DIRECTIVES,
         FormBuilder,
         Validators,
         ControlGroup,
         AbstractControl } from '@angular/common';


@Component({
  selector: 'admin-add',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: require('./admin-add.component.html'),
  styles: [require('./admin-add.component.scss')]
})

export class AdminAddComponent {
   form: ControlGroup;
   leagueType: AbstractControl;
   leagueYear: AbstractControl;

    constructor(private builder: FormBuilder) {
      this.form = builder.group({
        leagueType: ['', Validators.required],
        leagueYear: ['', Validators.compose([
          Validators.required])]
          
      });
      this.form.controls['leagueType'].valueChanges.subscribe(
        (value: string) => {
          console.log('Changed to:', value)
        }
      )
    }

    ngOnInit() {
    }
    onSubmit(form: any): void {
      console.log('you sumbitted value:', form);
    }
}
