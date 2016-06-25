import { Component, OnInit } from '@angular/core';
import { DynamicTableComponent } from '../../dynamic-tables';
import { League } from '../../models';

@Component({
  selector: 'admin-edit',
  template: require('./admin-edit.component.html'),
  directives: [ DynamicTableComponent ]
})
export class AdminEditComponent implements OnInit{

    table: string = "League"
    constructor(){}
    ngOnInit(){}
}
