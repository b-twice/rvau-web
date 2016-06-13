import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { HomeComponent } from './home';
import { AdminAddComponent} from './admin/add';
import { HeaderComponent } from './header';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [],
  directives: [ROUTER_DIRECTIVES, HeaderComponent],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/Admin/Add', component: AdminAddComponent, name: 'AdminAdd'}
])
export class AppComponent {
  constructor() {
  }
}
