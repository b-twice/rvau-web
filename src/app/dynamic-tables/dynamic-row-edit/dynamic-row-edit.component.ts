import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditItem } from '../edit-item';

@Component({
    selector: 'dynamic-row-edit',
    template: require('./dynamic-row-edit.component.html'),
    styles: [require('./dynamic-row-edit.component.scss')],
    directives: [],
    providers: [],
    pipes: []
})
export class DynamicRowEditComponent implements OnInit {
    
    @Input() questions:any[];
    @Input() row: EditItem;
    @Output() formSubmit = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        console.log(this.row.editing);
    }


}