import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../tables'
@Component({
  selector: 'admin-home',
  template: require('./admin-home.component.html'),
  directives: [ TableComponent ],
  styles: [require('../../tables/table.component.scss')]
})
export class AdminHomeComponent{
}
