import { TextboxQuestion, DropdownQuestion,
    characterValidator,  dateValidator }     from '../../shared';

const Moment = require('moment');


let getScores = function (score: number): number[] {
    let scores = [];
    for (let i = 0; i <= score; i++) {
        scores.push(i);
    }
    return scores;
};
let getYears = function (years: number): number[] {
    let now = Moment().year();
    let yearList = [];
    for (let i = 0; i <= years; i++) {
        yearList.push(now + i);
        yearList.push(now - i);
    }
    return yearList.sort();
};
export const AdminQuestions = {
    getYears: function (years: number): number[] {
        let now = Moment().year();
        let previous = [...Array(5).map(num => now - 1)];
        let next = [...Array(5).map(num => now + 1)];
        return [...previous, ...next];
    },
    leagues: [
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            placeholder: 'Select a season',
            options: ['Spring', 'Summer', 'Fall', 'Winter'],
            required: true,
            order: 1,
        }),
        new DropdownQuestion({
            key: 'league_year',
            label: 'League Year',
            placeholder: 'Select a year',
            type: 'Integer',
            options: [...getYears(5)],
            required: true,
            order: 2
        }),
    ],
    teams: [
        new TextboxQuestion({
            key: 'team_name',
            label: 'Team Name',
            type: 'Text',
            placeholder: 'Team name',
            required: true,
            order: 1,
            validators: [characterValidator],
            validationMessages: {
                'invalidCharacter': 'Team name must contain letters only'
            }
        }),
    ],
    players: [
        new TextboxQuestion({
            key: 'first_name',
            label: 'First Name',
            type: 'Text',
            placeholder: 'Enter first name of player',
            required: true,
            order: 1,
            validators: [characterValidator],
            validationMessages: {
                'invalidCharacter': 'Name must contain letters only'
            }
        }),
        new TextboxQuestion({
            key: 'last_name',
            label: 'Last Name',
            type: 'Text',
            placeholder: 'Enter last name of player',
            required: true,
            order: 2,
            validators: [characterValidator],
            validationMessages: {
                'invalidCharacter': 'Name must contain letters only'
            }
        }),
        new TextboxQuestion({
            key: 'email',
            label: 'Email',
            type: 'Email',
            placeholder: 'Enter player email address',
            required: false,
            order: 3,
            // validators: [emailValidator],
            validationMessages: {
                'invalidEmail': 'Not a valid email address'
            }
        }),
    ],
    leagueplayers: [
        new DropdownQuestion({
            key: 'league',
            label: 'League',
            placeholder: 'League name',
            options: [],
            source: 'leagues',
            required: true,
            filter: true,
            order: 1
        }),
        new DropdownQuestion({
            key: 'team_name',
            label: 'Team Name',
            type: 'Text',
            placeholder: 'Team name',
            options: [],
            source: 'teams',
            required: true,
            order: 2
        }),
        new DropdownQuestion({
            key: 'player_name',
            label: 'Player Name',
            type: 'Text',
            placeholder: 'Player name',
            options: [],
            source: 'players',
            required: true,
            order: 3
        }),
        new DropdownQuestion({
            key: 'player_type',
            label: 'Player Type',
            type: 'Text',
            placeholder: 'Player type',
            options: ['Player', 'Captain'],
            required: true,
            order: 4
        })
    ],
    games: [
        new TextboxQuestion({
            key: 'game_date',
            label: 'Game Date',
            placeholder: 'Enter a date (DD/MM/YYYY)',
            type: 'Text',
            required: true,
            order: 1,
            validators: [dateValidator],
            validationMessages: {
                'invalidDate': 'Date must a valid date and DD/MM/YYY format'
            }
        }),
        new DropdownQuestion({
            key: 'game_type',
            label: 'Game Type',
            type: 'Text',
            placeholder: 'Game type',
            options: [
                'Preseason',
                'Season',
                'Prequarter',
                'Quarterfinal',
                'Semifinal',
                'Final',
            ],
            require: true,
            order: 2
        }),
        new DropdownQuestion({
            key: 'league',
            label: 'League',
            placeholder: 'League',
            options: [],
            source: 'leagues',
            required: true,
            filter: true,
            order: 3
        }),
        new DropdownQuestion({
            key: 'home_team',
            label: 'Home Team',
            alias: 'team_name',
            type: 'Text',
            placeholder: 'Home team',
            options: [],
            source: 'teams',
            required: true,
            order: 5
        }),
        new DropdownQuestion({
            key: 'away_team',
            label: 'Away Team',
            alias: 'team_name',
            type: 'Text',
            placeholder: 'Away team',
            options: [],
            source: '',
            required: true,
            order: 6
        }),
        new DropdownQuestion({
            key: 'home_score',
            label: 'Home Score',
            type: 'Text',
            placeholder: 'Home score',
            options: [...getScores(50)],
            required: true,
            order: 7
        }),
        new DropdownQuestion({
            key: 'away_score',
            label: 'Away Score',
            type: 'Text',
            placeholder: 'Away score',
            options: [...getScores(50)],
            required: true,
            order: 8
        })
    ],

};
