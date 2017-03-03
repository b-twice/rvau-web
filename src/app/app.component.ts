import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rvau',
  template: `
    <main class='site'>
      <router-outlet></router-outlet>
    </main>
  `


})
export class AppComponent {
  constructor() {
  }
}
