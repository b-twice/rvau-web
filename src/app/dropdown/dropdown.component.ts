import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'dropdown',
    template: require('./dropdown.component.html'),
    styles: [require('./dropdown.component.scss')],

})
export class DropdownComponent{

    active: boolean = false;
    @Input() items: any[] = [];
    @Input() selected: string;
    @Output() onSelect = new EventEmitter();

    select(item: string) {
        this.onSelect.emit({ value: item });
        this.active = false;
    };

    onMouseEnter() { this.active = true; }
    onMouseLeave() { this.active = false; }
}
