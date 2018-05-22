import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../services/app.service';
import { PanelBaseComponent } from '../../core/base/panel-base.component'

@Component({
    selector: 'budget-panel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PanelSummaryComponent extends PanelBaseComponent implements OnInit {

    constructor(
        public route: ActivatedRoute,
        public appService: AppService,
    ) {
        super(route, appService);
    }

    ngOnInit() {
        this.resolveRoutes();
    }

}
