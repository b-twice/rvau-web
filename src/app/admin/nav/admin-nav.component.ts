import { Component, Input } from '@angular/core';

@Component({
    selector: 'admin-nav',
    templateUrl: './admin-nav.component.html',
    styleUrls: ['./admin-nav.component.scss']

})
export class AdminNavComponent {

    @Input() navRoot: string; // root of path i.e. /admin/leagues
    @Input() navMap: {}[] = []; // navigation map {{ link: 'pathname', name: 'name' }}
    @Input() activeNav: string; // current activated route

}
