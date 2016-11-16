import { Component } from '@angular/core';
@Component({
  selector: 'user',
  template: `
    <user-header></user-header>
    <router-outlet></router-outlet>
  `

})
export class UserComponent {
  constructor() { }
}
