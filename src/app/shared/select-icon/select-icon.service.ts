import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SelectIconService {
    constructor() { }

    // Observable string sources
    public clearRequest = new Subject<boolean>();

    // Observable string streams
    clearRequest$ = this.clearRequest.asObservable();

    // Service message commands
    requestClear(request: boolean) {
        this.clearRequest.next(request);
    }
}
