import { Pipe } from '@angular/core';
import { TableRow } from '../models'

@Pipe({
    name: 'mapPipe'
})
export class MapPipe {
    transform(map: {}, collectionKeys: any[]): any {
        if (!map)
            return null;
        return collectionKeys.map((key) => ({ 'key': key, 'value': map[key] }));
    }
}


@Pipe({
    name: 'rowPipe'
})
export class RowPipe {
    transform(rows: {}[]): any {
        if (!rows)
            return null;
        return rows.map(row => new TableRow({state: "None", value: row}))
    }
}

