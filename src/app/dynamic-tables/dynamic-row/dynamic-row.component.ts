import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../forms'
import { MapPipe } from '../dynamic-table.pipes';
import { TableService } from '../dynamic-table.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'dynamic-row',
    template: require('./dynamic-row.component.html'),
    styles: [require('./dynamic-row.component.scss')],
    directives: [DynamicFormComponent],
    pipes: [MapPipe],
})
export class DynamicRowComponent implements OnInit {
    @Input() keys: {};
    @Input() row: {};
    private componentId:number;

    subscription: Subscription;
    constructor(private router: Router,
                private tableService: TableService) {
    }

    ngOnInit() {
        let instance = this.tableService.registerInstance(this.row["id"])
        this.componentId = this.row["id"];
        this.subscription = instance.rowChanged$.subscribe(
            row => {
                this.row = row;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}