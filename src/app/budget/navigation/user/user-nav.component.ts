import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AppService } from '../../services/app.service';
import { User, NavigationParams } from '../../models/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

  users: User[];
  params: NavigationParams;
  year: string;
  panel: string

  constructor(
    public apiService: CoreService,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.appService.navigation.subscribe(data => this.params = data);
  }

  getUsers() {
    this.apiService.getUsers()
      .subscribe(
        users => this.users = users
      )
  }
}
