import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../../../services/navigation.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
    selector: 'budget-panel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PanelSummaryComponent extends PanelBaseComponent implements OnInit {

    constructor(
        public route: ActivatedRoute,
        public navigationService: NavigationService,
    ) {
        super(route, navigationService);
    }

    ngOnInit() {
        this.resolveRoutes();
    }

}
