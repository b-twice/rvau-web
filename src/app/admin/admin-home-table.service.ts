import { Injectable }       from '@angular/core';
import { DynamicTable }     from '../dynamic-tables';

@Injectable()
export class AdminHomeTableService {
    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    getQuestions() {
        let tableMetadata:DynamicTable[] = [
    ];
    // return tableMetadata.sort((a,b) => a.order - b.order);
    }
}