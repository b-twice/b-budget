import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PanelChartService {

  constructor() { }

  // Observable string sources
  public data = new Subject<any[]>();

  // Observable string streams
  data$ = this.data.asObservable();

  // Service message commands
  sendData(data: any[]) {
    this.data.next(data);
  }

}
