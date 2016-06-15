import { Component }       from '@angular/core';
import { DynamicForm }      from '../../forms/form/form.component';
import { LeagueMetadataService } from './league-metadata.service';
@Component({
  selector: 'admin-league-form',
  template: `
    <div>
      <h2>Add a League</h2>
      <dynamic-form [questions]="questions"></dynamic-form>
    </div>
  `,
  directives: [DynamicForm],
  providers:  [LeagueMetadataService]
})
export class LeagueFormComponent {
  questions:any[];

  constructor(service: LeagueMetadataService) {
    this.questions = service.getQuestions();
  }
}
