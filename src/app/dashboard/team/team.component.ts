import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dashboard-team',
    template: require('./team.component.html'),
    styles: [require('./team.component.scss')],

})
export class TeamComponent implements OnInit {

    @Input() team: string;
    @Input() league:     string;
    setData(league, team): void {
        return;
    }
    ngOnInit() {
    };
}
