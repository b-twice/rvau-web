import { Component }       from '@angular/core'
import { DynamicForm }      from '../../forms/form/form.component';
import { LeagueMetadataService } from './league-metadata.service';
@Component({
  selector: 'admin-league-form',
  template: `
    <div>
      <h2>Add a League</h2>
      <df [questions]="questions"></df>
    </div>
  `,
  directives: [DynamicForm],
  providers:  [LeagueMetadataService]
})
export class LeagueFormComponent {
  questions:any[]
  constructor(service: LeagueMetadataService) {
    console.log(service.getQuestions());
    this.questions = service.getQuestions();
  }
}
