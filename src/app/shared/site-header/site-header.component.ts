import { Component, OnInit, Injector } from '@angular/core';
import { APP_SETTINGS, IAppSettings } from '../../app.settings';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  settings: IAppSettings;

  constructor(
    public injector: Injector
  ) {
    this.settings = injector.get(APP_SETTINGS);
  }

  ngOnInit() {
  }

}
