import { Component, Input } from '@angular/core';

@Component({
    selector: 'static-table',
    templateUrl: './static-table.component.html',
    styleUrls: ['./static-table.component.scss'],

})
export class StaticTableComponent {

    @Input() columnNames: string[]; // pretty column names
    @Input() keys: string[]; // raw column names to format row order
    @Input() rows: {}[];

    constructor() { }

    sort(columnName) {
        // get key based on pos of column name (assumes same order)
        let key = this.keys[this.columnNames.indexOf(columnName)]
        let type = typeof this.rows[0][key];
        this.rows.sort(this.dynamicSort(key, type));

    }
    dynamicSort(property: string, type: string) {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        if (type === 'number') return (a, b) => (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        if (type === 'string') return (a, b) => a[property].localeCompare(b[property]);
    }
}
