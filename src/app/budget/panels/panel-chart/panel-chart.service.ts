import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PanelChartService {

  constructor() { }

  // Observable string sources
  public updateData = new Subject<any[]>();
  public drawData = new Subject<any[]>();

  // Observable string streams
  updateData$ = this.updateData.asObservable();
  drawData$ = this.drawData.asObservable();

  // Service message commands
  update(data: any[]) {
    this.updateData.next(data);
  }

  draw(data: any[]) {
    this.drawData.next(data);
  }

}
