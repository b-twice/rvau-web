import { Component } from '@angular/core';


@Component({
  selector: 'user-header',
  template: require('./user-header.component.html'),
  styles: [require('./user-header.component.scss')],
})
export class UserHeaderComponent {
  private title: string = "Richmond Ultimate Scores";
  constructor() {}
}
