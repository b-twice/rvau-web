import { Pipe, PipeTransform } from '@angular/core';
import { TableRow } from './dynamic-table.models';
import * as _ from 'lodash';

@Pipe({
    name: 'mapPipe'
})
export class MapPipe implements PipeTransform {
    transform(map: {}, collectionKeys: any[]): any {
        if (!map) {
            return null;
        }
        return collectionKeys.map((key) => ({ 'key': key, 'value': map[key] }));
    }
}


@Pipe({
    name: 'rowPipe'
})
export class RowPipe implements PipeTransform {
    transform(rows: {}[]): any {
        if (!rows) {
            return null;
        }
        return rows.map(row => new TableRow({ state: 'none', value: row }));
    }
}


@Pipe({
    name: 'filterMenuPipe'
})
export class FilterMenuPipe implements PipeTransform {
    transform(row: {}): any {
        if (!row) {
            return null;
        }
        return _.values(row).join(' ');
    }
}
