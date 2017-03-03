import { Component, Input } from '@angular/core';

@Component({
    selector: 'static-table',
    templateUrl: './static-table.component.html',
    styleUrls: ['./static-table.component.scss'],

})
export class StaticTableComponent {

    @Input() columnNames: string[]; // pretty column names
    @Input() keys: string[]; // raw column names to format row order
    @Input() rows: {}[];

    constructor() { }

}
