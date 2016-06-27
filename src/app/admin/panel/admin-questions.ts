import { QuestionBase, TextboxQuestion, DropdownQuestion }     from '../../forms';

export const AdminQuestions = {
    leagues: [
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: [
                { key: 'spring', value: 'Spring' },
                { key: 'summer', value: 'Summer' },
                { key: 'winter', value: 'Winter' },
                { key: 'fall', value: 'Fall' }
            ],
            required: true,
            order: 1
        }),
        new TextboxQuestion({
            key: 'league_year',
            label: 'League Year',
            type: 'Text',
            required: true,
            order: 2
        }),
    ]
}