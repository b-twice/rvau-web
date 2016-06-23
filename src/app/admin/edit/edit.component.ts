import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../tables';
import { League } from '../../models';

@Component({
  selector: 'admin-edit',
  template: require('./edit.component.html'),
  directives: [ TableComponent ],
  styles: [require('../../tables/table.component.scss')]
})
export class EditComponent implements OnInit{

    table: string = "League"
    constructor(){}
    ngOnInit(){}

    get
}
