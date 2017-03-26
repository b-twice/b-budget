import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../shared/util/util.service';
import { UserSummary } from '../models';

@Pipe({
  name: 'summaryTransform'
})
export class SummaryTransformPipe implements PipeTransform {

  constructor(
    public utilService: UtilService
  ) { }

  transform(values: any, name: string, year: string): any {
    if (values === null) {
      return values
    }
    if (name === "All") return this.utilService.combineObjectValues(new UserSummary(year, "All"), values)
    return values
  }


}
