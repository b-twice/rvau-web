import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';


@Component({
  selector: 'rvau-header',
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <ul class="nav navbar-header navbar-left">
        <li><a class="navbar-brand" [routerLink]="['Home']">Home</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a [routerLink]="['AdminAdd']">Add</a></li>
      </ul>
    </div>
  </nav>
  `
})
export class HeaderComponent {
  name = 'Richmond Ultimate';
}
