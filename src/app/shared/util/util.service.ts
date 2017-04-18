import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() { }

    public combineObjectValues<T>(newObject: T, objectList: T[], ignore: string[] = []): T {
        let tKeys = Object.keys(newObject).filter(k => typeof newObject[k] === "number" && ignore.indexOf(k) === -1);
        objectList.forEach(o => {
            tKeys.forEach(k => {
                newObject[k] += o[k];
            });
        });
        return newObject;
    }

}