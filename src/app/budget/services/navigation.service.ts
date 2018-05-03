import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NavigationParams } from '../models/core';

@Injectable()
export class NavigationService {

    constructor() { }

    // Observable string sources
    public updateData = new Subject<NavigationParams>();

    // Observable string streams
    updateData$ = this.updateData.asObservable();

    // Service message commands
    update(data: NavigationParams) {
        this.updateData.next(data);
    }

}
