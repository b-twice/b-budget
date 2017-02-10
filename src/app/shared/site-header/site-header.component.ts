import { Component, OnInit, Inject } from '@angular/core';
import { APP_SETTINGS, IAppSettings } from '../../app.settings';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  constructor(
    @Inject(APP_SETTINGS) private settings: IAppSettings
  ) {
  }

  ngOnInit() {
  }

}
