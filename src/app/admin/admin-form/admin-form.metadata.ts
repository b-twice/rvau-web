import { Injectable }       from '@angular/core';
import { QuestionBase, TextboxQuestion, DropdownQuestion }     from '../../forms';

@Injectable()
export class AdminFormMetadata {
    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    getQuestions() {
        let adminMetadata: QuestionBase<any>[] = [
            new DropdownQuestion({
                key:'league_type',
                label: 'League Type',
                options: [
                    {key: 'spring',  value: 'Spring'},
                    {key: 'summer',  value: 'Summer'},
                    {key: 'winter',   value: 'Winter'},
                    {key: 'fall', value: 'Fall'}
                ],
                required: true,
                order: 1
            }),
            new TextboxQuestion({
                key:'league_year',
                label:'League Year',
                type:'Text',
                required: true,
                order: 2
            }),
    ];
    return adminMetadata.sort((a, b) => a.order - b.order);
    }
}
