import { Pipe, PipeTransform } from '@angular/core';
import { TableRow } from '../models';

@Pipe({
    name: 'selectPipe'
})
export class SelectPipe implements PipeTransform {
    transform(items: any[], selectItem: string): any {
        if (!items) {
            return null;
        }
        return items.filter(item => item !== selectItem);
    }
}
