import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { HomeComponent } from './home';
import { LeagueFormComponent } from './admin/league-form';
import { HeaderComponent } from './header';
import { AdminHomeComponent } from './admin/home';

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
  {path: '/Admin/Add/Leagues', component: LeagueFormComponent, name: 'AddLeague'},
  {path: '/Admin', component:AdminHomeComponent, name:'AdminHome' }
])
export class AppComponent {
  constructor() {
  }
}
