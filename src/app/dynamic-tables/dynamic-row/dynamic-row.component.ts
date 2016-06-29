import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicRowComponent implements OnInit {
    @Input() keys: {};
    @Input() row: {};
    private componentId:number;

    subscription: Subscription;
    constructor(
                private tableService: TableService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        let instance = this.tableService.registerInstance(this.row["id"])
        this.componentId = this.row["id"];
        this.subscription = instance.rowChanged$.subscribe(
            row => {
                this.row = row;
                this.cd.markForCheck();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
