import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ApiService } from '../../services';

@Component({
    selector: 'dashboard-team',
    template: require('./team.component.html'),
    styles: [require('./team.component.scss')],

})
export class TeamComponent implements OnInit {

    constructor(
        private ds: DashboardService,
        private apiService: ApiService
    ) { }

    setData(league, team): void {
        return;
    }
    ngOnInit() {
        this.ds.routeSource$.subscribe(route => this.setData(route['league'], route['team']));
    };
}
