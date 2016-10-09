import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'dropdown',
    template: require('./dropdown.component.html'),
    styles: [require('./dropdown.component.scss')],

})
export class DropdownComponent implements OnInit {

    active: boolean = false;
    @Input() items: any[] = [];
    @Input() selectList: any[] = []; // filtered list of items
    @Input() selected: string;
    @Output() onSelect = new EventEmitter();

    ngOnInit() {
        this.selectList = this.items.filter(i => i !== this.selected);
    }
    select(item: string) {
        this.onSelect.emit({ value: item });
        this.selected = item;
        this.selectList = this.items.filter(i => i !== this.selected);
        this.active = false;
    };

    onMouseEnter() { this.active = true; }
    onMouseLeave() { this.active = false; }
}
