import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() { }

    public combineObjectValues<T>(newObject: T, objectList: T[], keys: string[]): T {
        objectList.forEach(o => {
            keys.forEach(k => {
                newObject[k] += o[k];
            });
        });
        return newObject;
    }
}