import { Component } from '@angular/core';
import { CORE_DIRECTIVES,
         FORM_DIRECTIVES,
         FormBuilder,
         Validators,
         ControlGroup,
         AbstractControl } from '@angular/common';
import { League } from '../../models';
import { LeagueService } from '../../services';
const _ = require('underscore');

@Component({
  selector: 'admin-add',
  providers: [LeagueService],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: require('./admin-add.component.html'),
  styles: [require('./admin-add.component.scss')]
})

export class AdminAddComponent {
   form: ControlGroup;
   leagueType: AbstractControl;
   leagueYear: AbstractControl;
   leagueType2: AbstractControl;
   leagueTypes: String[];
   constructor(private builder: FormBuilder, private leagueService: LeagueService) {
      this.form = builder.group({
        leagueType: ['', Validators.required],
        leagueYear: ['', Validators.compose([
          Validators.required])],
        leagueType2: ['', Validators.required]

      });
      this.form.controls['leagueType'].valueChanges.subscribe(
        (value: string) => {
          console.log('Changed to:', value);
        }
      );
    }

    ngOnInit() {
      this.leagueService.getLeagues()
            .subscribe(
              leagues => this.leagueTypes = _.uniq(leagues.map(league => league.leagueType)));
    }

    onSubmit(form: any): void {
      console.log(this.leagueTypes);
      console.log('you sumbitted value:', form);
    }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.form); }
}
