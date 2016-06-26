import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MapPipe } from '../dynamic-table.pipes';

@Component({
    selector: 'dynamic-row',
    template: require('./dynamic-row.component.html'),
    styles: [require('./dynamic-row.component.scss')],
    directives: [],
    providers: [],
    pipes: [MapPipe]
})
export class DynamicRowComponent implements OnInit {
    private keys: any[];
    @Input() row: {};

    constructor(private router: Router) {
    }

    ngOnInit() {
         this.keys = Object.keys(this.row).filter(k => k != 'id')
    }

}