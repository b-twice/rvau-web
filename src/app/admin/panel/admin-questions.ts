import { QuestionBase, TextboxQuestion, DropdownQuestion }     from '../../forms';

export const AdminQuestions = {
    leagues: [
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: ['Spring', 'Summer', 'Fall', 'Winter'],
            required: true,
            filter: true,
            order: 1,
        }),
        new DropdownQuestion({
            key: 'league_year',
            label: 'League Year',
            type: 'Integer',
            options: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            required: true,
            filter: true,
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
            required: false,
            order: 3
        }),
    ],
    leagueplayers: [
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: [],
            source: 'leagues',
            required: true,
            filter: true,
            order: 1
        }),
        new DropdownQuestion({
            key: 'league_year',
            label: 'League Year',
            type: 'Integer',
            options: [],
            source: 'leagues',
            required: true,
            filter: true,
            order: 2
        }),
        new DropdownQuestion({
            key: 'team_name',
            label: 'Team Name',
            type: 'Text',
            options: [],
            source: 'teams',
            required: true,
            order: 3
        }),
        new DropdownQuestion({
            key: 'first_name',
            label: 'Player First Name',
            type: 'Text',
            options: [],
            source: 'players',
            required: true,
            order: 4
        }),
        new DropdownQuestion({
            key: 'last_name',
            label: 'Player Last Name',
            type: 'Text',
            options: [],
            source: 'players',
            required: true,
            order: 5
        }),
        new DropdownQuestion({
            key: 'player_type',
            label: 'Player Type',
            type: 'Text',
            options: ['Player', 'Captain'],
            required: true,
            order: 6
        })
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
            key: 'game_type',
            label: 'Game Type',
            type: 'Text',
            options: [
                'Preseason',
                'Season',
                'Prequarter',
                'Quartefinal',
                'Semifinal',
                'Final',
            ],
            require: true,
            order: 2
        }),
        new DropdownQuestion({
            key: 'league_type',
            label: 'League Type',
            options: [],
            source: 'leagues',
            required: true,
            filter: true,
            order: 3
        }),
        new DropdownQuestion({
            key: 'league_year',
            label: 'League Year',
            options: [],
            type: 'Integer',
            source: 'leagues',
            required: true,
            filter: true,
            order: 4
        }),
        new DropdownQuestion({
            key: 'home_team',
            label: 'Home Team',
            type: 'Text',
            options: [],
            source: 'teams',
            required: true,
            order: 5
        }),
        new DropdownQuestion({
            key: 'away_team',
            label: 'Away Team',
            type: 'Text',
            options: [],
            source: 'teams',
            required: true,
            order: 6
        }),
        new DropdownQuestion({
            key: 'home_score',
            label: 'Home Score',
            type: 'Text',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ,16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
            required: true,
            order: 7
        }),
        new DropdownQuestion({
            key: 'away_score',
            label: 'Away Score',
            type: 'Text',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ,16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
            required: true,
            order: 8
        })
    ],

}