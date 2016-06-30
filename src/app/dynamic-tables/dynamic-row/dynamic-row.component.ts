import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DynamicFormComponent } from '../../forms'
import { MapPipe } from '../dynamic-table.pipes';
import { TableService } from '../dynamic-table.service';
import { Subscription }   from 'rxjs/Subscription';
import { TableRow } from '../../models';

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
    @Input() row: TableRow;
    private componentId: number;
    private state: string;

    subscription: Subscription;
    constructor(
        private tableService: TableService,
        private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        let instance = this.tableService.registerInstance(this.row.value["id"]);
        this.componentId = this.row.value["id"];
        this.state = this.row.state;
        this.subscription = instance.rowChanged$.subscribe(
            row => {
                // keep row persistent after delete for restore
                if (row.state !== "delete") {
                    this.row = row;
                }
                this.state = row.state;
                this.cd.markForCheck();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    startEditSession(): void {
        this.tableService.startTransaction(this.row.value);
    }
}
