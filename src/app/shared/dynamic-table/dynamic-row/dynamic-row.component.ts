import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DynamicTableService } from '../dynamic-table.service';
import { Subscription }   from 'rxjs/Subscription';
import { TableRow } from '../dynamic-table.models';

@Component({
    selector: 'dynamic-row',
    templateUrl: './dynamic-row.component.html',
    styleUrls: ['./dynamic-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicRowComponent implements OnInit, OnDestroy {
    @Input() keys: {};
    @Input() row: TableRow;
    public componentId: number;
    public state: string;

    subscription: Subscription;
    constructor(
        public tableService: DynamicTableService,
        public cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        let instance = this.tableService.registerInstance(this.row.value['id']);
        this.componentId = this.row.value['id'];
        this.state = this.row.state;
        this.subscription = instance.rowChanged$.subscribe(
            row => {
                // keep row persistent after delete for restore
                if (row.state !== 'delete') {
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
