import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { FormRequest, TableRow } from '../models'

export class RowInstance {
    rowSource: any;
    rowChanged$: any;
    constructor()
    {
        this.rowSource = new Subject<{}>();
        this.rowChanged$ = this.rowSource.asObservable();
    }
}

@Injectable()
export class TableService {
    
    // Hook binding an observable to each row
    private rowInstances: { [id: string]: RowInstance} = {};

    private rowsAddedSource = new Subject<any[]>(); // Rows passed to table
    private formPostSource = new Subject<FormRequest>(); // send submitted form
    private postResponseSource = new Subject<FormRequest>(); // get form results
    private closeTransactionSource = new Subject<number>(); // stop form editing
    private startTransactionSource = new Subject<{}>(); // start form editing

    formPost$ = this.formPostSource.asObservable();
    rowsAdded$ = this.rowsAddedSource.asObservable();
    postResponse$ = this.postResponseSource.asObservable();
    startTransaction$ = this.startTransactionSource.asObservable()
    closeTransaction$ = this.closeTransactionSource.asObservable();

    // send form
    postForm(form: FormRequest): void {
        this.formPostSource.next(form);
    }

    // form post results
    postResponse(response: FormRequest): void {
        this.postResponseSource.next(response);
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
        this.rowsAddedSource.next(rows)
    }

    registerInstance(rowId: number) {
        return this.rowInstances[rowId] = new RowInstance();
    }

    changeRow(row: TableRow) {
        this.rowInstances[row.value["id"]].rowSource.next(row);
    }
}
