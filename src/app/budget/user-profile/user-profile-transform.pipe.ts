import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../shared/util/util.service';
import { UserProfile } from '../models';

@Pipe({
  name: 'userProfileTransform'
})
export class UserProfileTransformPipe implements PipeTransform {

  constructor(
    public utilService: UtilService
  ) { }

  transform(values: any, name: string): any {
    if (values === null) {
      return values
    }
    return values
  }


}
