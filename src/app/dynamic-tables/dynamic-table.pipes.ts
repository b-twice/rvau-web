import {Pipe} from '@angular/core';

@Pipe({
    name: 'mapPipe'
})
export class MapPipe {
    transform(map: {},  collectionKeys: any[]): any {
        if (!map)
            return null;
        return collectionKeys.map((key) => ({ 'key': key, 'value': map[key] }));
    }
}
