import { Component } from '@angular/core';


@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  private title: string = "Richmond Ultimate Scores";
  constructor() {}
}
