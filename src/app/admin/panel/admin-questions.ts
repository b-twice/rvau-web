import { QuestionBase, TextboxQuestion, DropdownQuestion }     from '../../forms';

export const AdminQuestions = {
    leagues: [
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: [
                { key: 'Spring', value: 'Spring' },
                { key: 'Summer', value: 'Summer' },
                { key: 'Winter', value: 'Winter' },
                { key: 'Fall', value: 'Fall' }
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
    ],
    teams: [
        new TextboxQuestion({
            key: 'team_name',
            label: 'Team Name',
            type: 'Text',
            required: true,
            order: 1
        }),
    ],
    players: [
        new TextboxQuestion({
            key: 'first_name',
            label: 'First Name',
            type: 'Text',
            required: true,
            order: 1
        }),
        new TextboxQuestion({
            key: 'last_name',
            label: 'Last Name',
            type: 'Text',
            required: true,
            order: 2
        }),
        new TextboxQuestion({
            key: 'email',
            label: 'Email',
            type: 'Email',
            required: true,
            order: 3
        }),
    ],
    leagueplayers: [
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: [
                { key: 'Spring', value: 'Spring' },
                { key: 'Summer', value: 'Summer' },
                { key: 'Winter', value: 'Winter' },
                { key: 'Fall', value: 'Fall' }
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
        new TextboxQuestion({
            key: 'team_name',
            label: 'Team Name',
            type: 'Text',
            required: true,
            order: 3
        }),
        new TextboxQuestion({
            key: 'player_first_name',
            label: 'Player First Name',
            type: 'Text',
            required: true,
            order: 4
        }),
        new TextboxQuestion({
            key: 'player_last_name',
            label: 'Player Last Name',
            type: 'Text',
            required: true,
            order: 5
        }),
    ],
    games: [
        new TextboxQuestion({
            key: 'game_date',
            label: 'Game Date',
            type: 'Text',
            required: true,
            order: 1
        }),
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: [
                { key: 'Spring', value: 'Spring' },
                { key: 'Summer', value: 'Summer' },
                { key: 'Winter', value: 'Winter' },
                { key: 'Fall', value: 'Fall' }
            ],
            required: true,
            order: 2
        }),
        new TextboxQuestion({
            key: 'league_year',
            label: 'League Year',
            type: 'Text',
            required: true,
            order: 3
        }),
        new TextboxQuestion({
            key: 'home_team',
            label: 'Home Team',
            type: 'Text',
            required: true,
            order: 4
        }),
        new TextboxQuestion({
            key: 'away_team',
            label: 'Away Team',
            type: 'Text',
            required: true,
            order: 5
        }),
        new TextboxQuestion({
            key: 'home_score',
            label: 'Home Team',
            type: 'Text',
            required: true,
            order: 6
        }),
        new TextboxQuestion({
            key: 'away_score',
            label: 'Away Score',
            type: 'Text',
            required: true,
            order: 7
        })
    ],

}