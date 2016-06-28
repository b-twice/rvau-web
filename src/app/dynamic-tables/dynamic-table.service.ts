import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class TableService {
    // Observable string sources
    private formSubmittedSource = new Subject<{}>();

    // Observable string streams
    formSubmitted$ = this.formSubmittedSource.asObservable();

    // Service message commands
    submitForm(form: {}) {
        this.formSubmittedSource.next(form);
    }

}