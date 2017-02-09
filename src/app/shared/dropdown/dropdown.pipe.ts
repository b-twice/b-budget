import { Pipe, PipeTransform } from '@angular/core';

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
