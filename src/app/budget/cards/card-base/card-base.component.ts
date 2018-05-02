import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'budget-card-base',
    template: '<div></div>',
    styleUrls: []
})
export class CardBaseComponent {

    sortProperty: string;
    sortDesc: boolean = false;


    constructor(
        public location: Location
    ) { }

    closeModal() {
        this.location.back();
    }

    stopPropogation(event): void { event.stopPropagation(); }

    sort(sortProperty: string) {
        if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
        else this.sortDesc = false;
        this.sortProperty = sortProperty;
    }


}

