import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';
import { AdminNavComponent } from '../nav';
import { Tables } from '../';

const _ = require('lodash');

@Component({
  selector: 'admin-table',
  template: require('./admin-table.component.html'),
  providers: [ApiService],
  directives: [DynamicTableComponent, AdminNavComponent],
  styles: []
})
export class AdminTableComponent implements OnInit{

    private tableMap = Tables; // map for navigation
    private sub: any;
    private table: string; // name of active table
    private keys: any[]; // column names
    private values: any[][] = []; // array of row values
    private tableTheme = "light-theme"; // dynamic table theme
    constructor(private route: ActivatedRoute, private service: ApiService) {}
    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            this.table = params['table']; 
            this.service.getData(this.table)
                .subscribe(data => {
                    this.keys = Object.keys(data[0]);
                    for (let o of data) {
                        let v = Object.keys(o).map(key => o[key]);
                        this.values.push(v);
                    }
            })
        })
    }
    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
