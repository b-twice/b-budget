import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationParams } from '../../models';
import { NavigationService } from '../../services/navigation.service';


@Component({
    selector: 'budget-panel-base',
    template: '<div></div>',
    styleUrls: []
})
export class PanelBaseComponent {

    user: string;
    year: string;
    panel: string;
    sortProperty: string;
    sortDesc: boolean = false;


    constructor(
        public route: ActivatedRoute,
        public navigationService: NavigationService,
    ) { }

    resolveRoutes() {
        this.route.params.subscribe(
            params => {
                this.user = params['user'];
                this.year = params['year'];
                this.updateNavigation();
                this.getData();
            }
        )
        this.route.url.subscribe(
            url => {
                this.panel = url[0].path;
                this.updateNavigation();
            }
        );
    }

    getData() {

    }

    updateNavigation() {
        if (!(this.user && this.panel && this.year)) return;
        var params = new NavigationParams(this.user, this.panel, this.year)
        this.navigationService.update(params);
    }

    sort(sortProperty: string) {
        if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
        else this.sortDesc = false;
        this.sortProperty = sortProperty;
    }


}

