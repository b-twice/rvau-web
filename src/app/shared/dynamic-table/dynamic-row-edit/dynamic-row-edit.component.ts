import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EditSession } from '../dynamic-table.models';
import { FormRequest } from '../../request-models';
import { DynamicTableService } from '../dynamic-table.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dynamic-row-edit',
    template: require('./dynamic-row-edit.component.html'),
    styles: [require('./dynamic-row-edit.component.scss')],
})
export class DynamicRowEditComponent implements OnInit, OnDestroy {

    @Input() formQuestions: any[];
    private formRow: {};
    public body = document.getElementsByTagName('body')[0];

    private deleteEnabled: boolean = true; // change state if post
    private editSession = new EditSession();
    closeTransactionSub: Subscription;
    startTransactionSub: Subscription;

    constructor(private tableService: DynamicTableService) { }

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
        this.formRow = row;
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
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('modal');
        let rowEmpty = Object.keys(row).length === 0 ? true : false;
        if (rowEmpty) {
            this.editSession.setState('post');
            this.deleteEnabled = false;
        }
        else {
            this.editSession.setState('put');
            this.deleteEnabled = true;
        }
        this.setFormValues(row, rowEmpty);
        this.editSession.active = true;
        if (!rowEmpty) {
            this.editSession.id = row['id'];
        }
    }

    stopEditSession(): void {
        this.body.classList.remove('modal');
        if (!this.editSession.transaction) {
            this.editSession.active = false;
        }
    }

    deleteRow() {
        if (!this.editSession.id) {
            return;
        }
        this.editSession.state = 'delete';
        let form = new FormRequest({ action: this.editSession.state, value: { id: this.editSession.id } });
        this.editSession.transaction = true;
        this.tableService.postForm(form);
    }

    onSubmit(event): void {
        this.body.classList.remove('modal');
        let value = event.value;
        if (this.editSession.state === 'put') {
            value['id'] = this.editSession.id;
            let doesMatch = true;
            Object.keys(value).forEach(k => {
                if (value[k] !== this.formRow[k]) {
                    doesMatch = false;
                }
            });
            if (doesMatch) {
                this.tableService.postResponse(
                    new FormRequest({ success: false, action: 'put', message: 'The record already exists.' }));
                return;
            }
        }
        let form = new FormRequest({ action: this.editSession.state, value: value });
        this.editSession.transaction = true;
        this.tableService.postForm(form);

    }

    stopPropogation(event): void { event.stopPropagation(); }
}
