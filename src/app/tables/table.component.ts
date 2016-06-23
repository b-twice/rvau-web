import { Component, OnInit, Input } from '@angular/core';
import { Table } from './';


@Component({
  selector: 'dynamic-table',
  template: require('./table.component.html'),
  directives: [],
  providers:  []
})
export class TableComponent implements OnInit {
  @Input() table: Table;

  constructor() {  }
  ngOnInit(){

  }
}