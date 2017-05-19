import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicSort'
})
export class DynamicSortPipe implements PipeTransform {

  transform(values: any[], sortProperty: string, reverse: boolean): any {
    if (!sortProperty) {
      return values
    }
    if (!values.length) {
      return [];
    }
    let type = typeof values[0][sortProperty];
    return values.sort(this.dynamicSort(sortProperty, type, reverse))

  }

  dynamicSort(property: string, type: string, reverse: boolean) {
    let sortOrder = reverse ? -1 : 1;
    if (type === 'number') return (a, b) => sortOrder * ((a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0);
    // if (type === 'string') return (a, b) => sortOrder ? a[property].localeCompare(b[property]) : b[property].localCompare(a[property]);
    if (type === 'string') return (a, b) => sortOrder * (a[property] > b[property] ? 1 : 0 - (a[property] < b[property] ? 1 : 0));
  }


}
