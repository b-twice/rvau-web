import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';

const _ = require('lodash');

@Component({
  selector: 'admin-table',
  template: require('./admin-table.component.html'),
  providers: [ApiService],
  directives: [DynamicTableComponent],
  styles: []
})
export class AdminTableComponent implements OnInit{

    private sub: any;
    private keys: any[];
    private values: any[][] = []; 
    constructor(private route: ActivatedRoute, private service: ApiService) {}
    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            let table = params['table']; 
            this.service.getData(table)
                .subscribe(data => {
                    this.keys = Object.keys(data[0]);
                    for (let o of data) {
                        let v = Object.keys(o).map(key => o[key]);
                        console.log(v);
                        this.values.push(v);
                    }
            })
        })
    }
    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
