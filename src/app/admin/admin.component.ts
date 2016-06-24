import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from './header';

@Component({
  selector: 'admin',
  template: require('./admin.component.html'),
  directives: [AdminHeaderComponent],
  styles: []
})
export class AdminComponent{
}
