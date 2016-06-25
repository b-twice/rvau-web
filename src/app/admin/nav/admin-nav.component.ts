import { Component, Input } from '@angular/core';

@Component({
    selector: 'admin-nav',
    template: require('./admin-nav.component.html'),
    styles: [require('./admin-nav.component.scss')]

})
export class AdminNavComponent{

    @Input() navRoot: string;
    @Input() navMap: {}[] = [];
    @Input() activeNav: string;
}