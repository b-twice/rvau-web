import { Injectable }       from '@angular/core';
import { AdminQuestions } from './admin-questions';

@Injectable()
export class AdminEditMetadata {

    private adminQuestions = AdminQuestions;
    constructor() { }
    getQuestions(tableName: string) {
        return this.adminQuestions[tableName].sort((a, b) => a.order - b.order);
    }
}
