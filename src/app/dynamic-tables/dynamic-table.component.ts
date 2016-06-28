import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTable } from './';
import { DynamicRowComponent } from './dynamic-row'


@Component({
  selector: 'dynamic-table',
  template: require('./dynamic-table.component.html'),
  styles: [require('./dynamic-table.component.scss')],
  directives: [DynamicRowComponent],
  providers: []
})
export class DynamicTableComponent implements OnInit {
  @Input() theme;
  @Input() editable: boolean = false;
  @Input() questions: {}[]; 
  private keys: any[]; // column names
  private collection: any[][] = []; // array of row values

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  setData(data) {

    this.keys = Object.keys(data[0]).filter(key => key !== 'id');
    this.collection = data
  }
}