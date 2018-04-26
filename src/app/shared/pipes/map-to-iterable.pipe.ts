import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapToIterable'
})
export class MapToIterablePipe implements PipeTransform {
    transform(map: { [key: string]: any }, ...parameters: any[]) {
        if (!map)
            return undefined;
        let x = Object.keys(map)
            .map((key) => ({ 'key': key, 'value': map[key] }));
        console.log(x)
        return x
    }
}