import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationParams } from '../../../models/core';
import { NavigationService } from '../../../services/navigation.service';


@Component({
    selector: 'budget-panel-base',
    template: '<div></div>',
    styleUrls: []
})
export class PanelBaseComponent {

    user: string;
    year: string;
    panel: string;
    module: string;
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
        this.route.parent.parent.url.subscribe(
            url => {
                this.module = url[0].path;
                this.updateNavigation();
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
        if (!(this.user && this.panel && this.year && this.module)) return;
        var params = new NavigationParams(this.module, this.panel, this.user, this.year)
        this.navigationService.update(params);
    }

    sort(sortProperty: string) {
        if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
        else this.sortDesc = false;
        this.sortProperty = sortProperty;
    }

    categoryChange() {
        this.getData();
    }




}

