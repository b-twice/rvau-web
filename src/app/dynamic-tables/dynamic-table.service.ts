import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { FormPost, FormResponse} from '../models'

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
    private formPostSource = new Subject<FormPost>();
    private postResponseSource = new Subject<FormResponse>();

    formPost$ = this.formPostSource.asObservable();
    rowsAdded$ = this.rowsAddedSource.asObservable();
    postResponse$ = this.postResponseSource.asObservable();

    // send form
    postForm(form: FormPost) {
        this.formPostSource.next(form);
    }

    // form post results
    postResponse(response: FormResponse) {
        this.postResponseSource.next(response);
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
