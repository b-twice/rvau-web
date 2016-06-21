import { Component, OnInit, Input } from '@angular/core';
import { ControlGroup } from '@angular/common';
import { Table } from './';


@Component({
  selector: 'dynamic-table',
  template: require('./table.component.html'),
  directives: [],
  providers:  []
})
export class TableComponent implements OnInit {
  @Input() table: Table;

  form: ControlGroup;

  constructor() {  }
  ngOnInit(){

  }
}