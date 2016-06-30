import { Component } from '@angular/core';


@Component({
    selector: 'loading-indicator',
    providers: [],
    directives: [],
    template: require('./loading.component.html'),
    styles: [require('./loading.scss')],
})
export class LoadingComponent {
    constructor() { }
}
