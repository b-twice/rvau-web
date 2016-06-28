import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { FormSubmit} from '../models'

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

    private rowsAddedSource = new Subject<any[]>();
    private formSubmittedSource = new Subject<FormSubmit>();
    private formResponseSource = new Subject<FormSubmit>();

    formSubmitted$ = this.formSubmittedSource.asObservable();
    rowsAdded$ = this.rowsAddedSource.asObservable();
    formResponse$ = this.formResponseSource.asObservable();

    // send form
    submitForm(form: FormSubmit) {
        this.formSubmittedSource.next(form);
    }

    // form post results
    formResponse(form: FormSubmit) {
        this.formResponseSource.next(form);
    }

    addRows(rows: any[]) {
        this.rowsAddedSource.next(rows)
    }

    registerInstance(rowId: number) {
        return this.rowInstances[rowId] = new RowInstance();
    }

    changeRow(row: {}) {
        this.rowInstances[row["id"]].rowSource.next(row);
    }
}