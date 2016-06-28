import { Component, OnInit, Input }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent }      from '../../forms/form.component.ts';
import { AdminEditMetadata } from '../panel/admin-edit.metadata';
import { ApiService } from '../../services';


@Component({
  selector: 'admin-league-form',
  template: `
    <div>
      <h2>{{tableName}}</h2>
      <dynamic-form [question]="questions" [submitButtonText]="submitButtonText" (onSubmit)="formSubmit($event)"></dynamic-form>
    </div>
  `,
  directives: [DynamicFormComponent],
  providers:  [ApiService, AdminEditMetadata]
})
export class AdminEditComponent implements OnInit {

  sub: any;
  tableName: string ="Sup";
  submitButtonText: string = "Submit";
  questions:any[];
  form: FormGroup;
  constructor(
               private route: ActivatedRoute,
               private router: Router,
               private apiService: ApiService,
               private metadata: AdminEditMetadata) {}

  ngOnInit() {
    this.questions = this.metadata.getQuestions("leagues");
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
  }
}
