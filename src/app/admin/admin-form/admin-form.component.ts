import { Component, OnInit }       from '@angular/core';
import { Router} from '@angular/router';
import { ControlGroup } from '@angular/common';
import { DynamicFormComponent }      from '../../forms/form.component.ts';
import { ApiService } from '../../services';


@Component({
  selector: 'admin-league-form',
  template: `
    <div>
      <h2>Add a League</h2>
      <dynamic-form [questions]="questions" [submitButtonText]="submitButtonText" (onSubmit)="formSubmit($event)"></dynamic-form>
    </div>
  `,
  directives: [DynamicFormComponent],
})
export class AdminFormComponent implements OnInit {
  submitButtonText: string = "Submit";
  questions:any[];
  form: ControlGroup;
  constructor( 
               private router: Router,
               private apiService: ApiService) {}

  ngOnInit() {
  }
  formSubmit(event) {

    // value emited from form in child view
    let form = event.value;

    // Add when API complete
    // let results:League = new League(form.league_type, form.league_year)

    console.log(form.league_type);
    // this.leagueService.addLeague(results)
    //   .subscribe((result) => {
    //     if (result) {
    //       this.router.navigate(['Home']);
    //     }
    // });

    this.router.navigate(['Home'])
  }
}
