import { Injectable }       from '@angular/core';
import { Table }     from '../tables';

@Injectable()
export class AdminHomeTableService {
    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    getQuestions() {
        let tableMetadata:Table[] = [
    ];
    // return tableMetadata.sort((a,b) => a.order - b.order);
    }
}