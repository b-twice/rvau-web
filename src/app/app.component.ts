import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rvau',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent {
  constructor() {
  }
}
