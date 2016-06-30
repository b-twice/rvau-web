import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormRequest, EditSession } from '../../models';
import { TableService } from '../dynamic-table.service';
import { Subscription }   from 'rxjs/Subscription';
import { DynamicFormComponent } from '../../forms';
import { LoadingComponent } from '../../loading';

@Component({
    selector: 'dynamic-row-edit',
    providers: [],
    directives: [DynamicFormComponent, LoadingComponent],
    template: require('./dynamic-row-edit.component.html'),
    styles: [require('./dynamic-row-edit.component.scss')],
})
export class DynamicRowEditComponent implements OnInit, OnDestroy {

    @Input() formQuestions: any[];

    private editSession = new EditSession();
    closeTransactionSub: Subscription;
    startTransactionSub: Subscription;

    constructor(private tableService: TableService) { }

    ngOnInit() {
        this.closeTransactionSub = this.tableService.closeTransaction$.subscribe(
            response => this.editSession.close()
        );

        this.startTransactionSub = this.tableService.startTransaction$.subscribe(
            row => this.startEditSession(row)
        );

    }

    ngOnDestroy() {
        this.closeTransactionSub.unsubscribe();
        this.startTransactionSub.unsubscribe();
    }

    setFormValues(row, empty: boolean): void {
        if (empty) {
            this.formQuestions.forEach(question => question.value = '');
            return;
        }
        let rowKeys = Object.keys(row);
        // Set question value if key exists in keys
        this.formQuestions.forEach(question => {
            if (rowKeys.indexOf(question.key) !== -1) {
                question.value = row[question.key];
            }
        });
    }

    startEditSession(row: {} = {}) {
        let rowEmpty = Object.keys(row).length === 0 ? true : false;
        if (rowEmpty) { this.editSession.setState('post'); }
        else { this.editSession.setState('put'); }
        this.setFormValues(row, rowEmpty);
        this.editSession.active = true;
        if (!rowEmpty) {
            this.editSession.id = row['id'];
        }
    }

    stopEditSession(): void {
        if (!this.editSession.transaction) {
            this.editSession.active = false;
        }
    }
    deleteRow() {
        this.editSession.state = 'delete';
        let form = new FormRequest({ action: this.editSession.state, value: { id: this.editSession.id } });
        this.editSession.transaction = true;
        this.tableService.postForm(form);
    }
    onSubmit(event): void {
        let value = event.value;
        if (this.editSession.state === 'put') {
            value['id'] = this.editSession.id;
        }
        let form = new FormRequest({ action: this.editSession.state, value: event.value });
        this.editSession.transaction = true;
        this.tableService.postForm(form);
    }

    stopPropogation(event): void { event.stopPropagation(); }
}
