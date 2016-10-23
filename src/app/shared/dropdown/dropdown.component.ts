import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'dropdown',
    template: require('./dropdown.component.html'),
    styles: [require('./dropdown.component.scss')],

})
export class DropdownComponent implements OnInit, OnChanges {

    active: boolean = false;
    @Input() items: any[] = [];
    @Input() selectList: any[] = []; // filtered list of items
    @Input() selected: string[] = []; // hacky way to
    @Output() onSelect = new EventEmitter();

    ngOnInit() {
        this.filterItems();
    };

    filterItems(){
        this.selectList = this.items.filter(i => i !== this.selected);

    };
    select(item: string) {
        this.selected = [item];
        this.selectList = this.items.filter(i => i !== this.selected);
        this.onSelect.emit({ value: item });
        this.active = false;
    };

    // whenever input changes rebuild list
    // this allows the dropdown to display new data passed in without having to destroy component from parent
    ngOnChanges() {
        this.filterItems();
    }

    onMouseEnter() { this.active = true; }
    onMouseLeave() { this.active = false; }
}
