import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NavigationParams } from '../models/core';

@Injectable()
export class AppService {

    constructor() { }

    // Observable string sources
    public navigation = new Subject<NavigationParams>();

    // Observable string streams
    navigation$ = this.navigation.asObservable();

    public editEvent = new Subject<any>();
    editEvent$ = this.editEvent.asObservable();

    edit<T>(data: T) {
        this.editEvent.next(data);
    }

    // Service message commands
    updateNavigation(data: NavigationParams) {
        this.navigation.next(data);
    }

}
