import { Component, Input } from '@angular/core';

@Component({
    selector: 'admin-nav',
    template: require('./admin-nav.component.html'),
    styles: [require('./admin-nav.component.scss')]

})
export class AdminNavComponent {

    @Input() navRoot: string; // root of path i.e. /admin/leagues
    @Input() navMap: {}[] = []; // navigation map {{ link: 'pathname', name: 'name' }}
    @Input() activeNav: string; // current activated route

}
