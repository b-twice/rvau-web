import { Component, OnInit, Input }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlGroup } from '@angular/common';
import { DynamicFormComponent }      from '../../forms/form.component.ts';
// import { AdminEditMetadata } from './admin-edit.metadata';
import { ApiService } from '../../services';


@Component({
  selector: 'admin-league-form',
  template: `
    <div>
      <h2>{{tableName}}</h2>
      <dynamic-form [questions]="questions" [submitButtonText]="submitButtonText" (onSubmit)="formSubmit($event)"></dynamic-form>
    </div>
  `,
  directives: [DynamicFormComponent],
  providers:  [ApiService]
})
export class AdminEditComponent {

  sub: any;
  tableName: string;
  submitButtonText: string = "Submit";
  questions:any[];
  form: ControlGroup;
  constructor(
               private route: ActivatedRoute,
               private router: Router,
               private apiService: ApiService) {}

  // ngOnInit() {
  //       this.sub = this.route.params.subscribe(params => {
  //           this.tableName = params['table']; 
  //           this.questions = this.metadata.getQuestions(this.tableName);
  //       })
  // }
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
