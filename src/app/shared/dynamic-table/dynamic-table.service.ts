import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { FormRequest, GetRequest } from '../request-models';
import { TableRow } from './dynamic-table.models';


export class RowInstance {
    rowSource: any;
    rowChanged$: any;
    constructor() {
        this.rowSource = new Subject<{}>();
        this.rowChanged$ = this.rowSource.asObservable();
    }
}

@Injectable()
export class DynamicTableService {

    // Hook binding an observable to each row
    public rowInstances: { [id: string]: RowInstance } = {};

    public rowsAddedSource = new Subject<any[]>(); // Rows passed to table
    public formPostSource = new Subject<FormRequest>(); // send submitted form
    public postResponseSource = new Subject<FormRequest>(); // get form results
    public closeTransactionSource = new Subject<number>(); // stop form editing
    public startTransactionSource = new Subject<{}>(); // start form editing
    public getRequestSource = new Subject<GetRequest>();
    public getResponseSource = { 'filter': new Subject<GetRequest>() };


    formPost$ = this.formPostSource.asObservable();
    rowsAdded$ = this.rowsAddedSource.asObservable();
    getRequest$ = this.getRequestSource.asObservable();
    getFilterResponse$ = this.getResponseSource.filter.asObservable();
    postResponse$ = this.postResponseSource.asObservable();
    startTransaction$ = this.startTransactionSource.asObservable();
    closeTransaction$ = this.closeTransactionSource.asObservable();


    // send form
    postForm(form: FormRequest): void {
        this.formPostSource.next(form);
    }

    // form post results
    postResponse(response: FormRequest): void {
        this.postResponseSource.next(response);
    }

    getRequest(request: GetRequest): void {
        this.getRequestSource.next(request);
    }

    getResponse(response: GetRequest): void {
        if (response.action) {
            this.getResponseSource[response.action].next(response);
        }
    }
    // start edit transaction
    startTransaction(row: {}): void {
        this.startTransactionSource.next(row);
    }

    // close edit transaction
    closeTransaction(id: number): void {
        this.closeTransactionSource.next(id);
    }

    addRows(rows: {}[]): void {
        this.rowInstances = {};
        this.rowsAddedSource.next(rows);
    }

    registerInstance(rowId: number) {
        return this.rowInstances[rowId] = new RowInstance();
    }

    changeRow(row: TableRow) {
        this.rowInstances[row.value['id']].rowSource.next(row);
    }
}
