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
    @Input() selected: string[] = []; // if selected is array then updates on changes
    @Output() onSelect = new EventEmitter();

    ngOnInit() {
        this.filterItems();
    };

    filterItems() {
        this.selectList = this.items.filter(i => i !== this.selected);

    };
    select(item: any) {
        this.selected = item instanceof Array === true ? [item[0]] : [item];
        this.selectList = this.items.filter(i => i !== this.selected);
        this.onSelect.emit({ value: this.selected[0]});
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
