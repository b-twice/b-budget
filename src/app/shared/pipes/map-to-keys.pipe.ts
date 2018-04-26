import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'mapToKeys',
    pure: false
})
export class MapToKeysPipe implements PipeTransform {
    transform(value: any, ...parameters: any[]): any {
        return Object.keys(value)
    }
}