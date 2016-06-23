import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header';

@Component({
  selector: 'dashboard-home',
  directives: [HeaderComponent],
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
