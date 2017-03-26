import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../shared/util/util.service';
import { UserCategory } from '../models';

@Pipe({
  name: 'categoriesTransform'
})
export class CategoriesTransformPipe implements PipeTransform {

  constructor(
    public utilService: UtilService
  ) { }

  transform(values: any, name: string, year: string): any {

    if (values === null) {
      return values
    }

    let displayGroups = {};
    let categorySummary = {};
    // first summarize values
    values.forEach(c => {
      if (!categorySummary.hasOwnProperty(c.categoryName)) {
        categorySummary[c.categoryName] = { group: c.categoryGroupName, total: 0, growth: 0 };
      }
      categorySummary[c.categoryName]["total"] += c.amount;
      categorySummary[c.categoryName]["growth"] += c.growth;
    });
    // build an array for each group with an o summarizing the category
    Object.keys(categorySummary).forEach(k => {
      let c = categorySummary[k];
      if (!displayGroups.hasOwnProperty(c.group)) {
        displayGroups[c.group] = [];
      }
      displayGroups[c.group].push({ name: k, total: c.total, growth: c.growth });
    });
    return displayGroups
  }


}
