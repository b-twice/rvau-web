import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'scorebox',
    templateUrl: './scorebox.component.html',
    styleUrls: ['./scorebox.component.scss'],
})
export class ScoreboxComponent implements OnInit {


    @Input() game: {};

    private winner: string;
    constructor() { }

    ngOnInit() {
        if (this.game['home_score'] === this.game['away_score']) {
            this.winner = '';
        }
        else if (this.game['home_score'] > this.game['away_score']) {
            this.winner = this.game['home_team'];
        }
        else {
            this.winner = this.game['away_team'];
        }
    };


}
