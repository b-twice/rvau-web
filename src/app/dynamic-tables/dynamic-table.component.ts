import { Component, OnInit, Input } from '@angular/core';
import { DynamicTable } from './';


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [],
  providers:  []
})
export class DynamicTableComponent implements OnInit {
  // @Input() table: DynamicTable;
  @Input() keys;
  @Input() values;

  constructor() {  }
  ngOnInit(){
    console.log(this.values);
  }
}