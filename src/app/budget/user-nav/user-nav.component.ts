import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

  users: User[];
  currentYear: string;
  currentPanel: string

  constructor(
    public budgetService: BudgetService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.activatedRoute.params.subscribe(
      params =>
        this.currentYear = params['year']
    )

    this.activatedRoute.firstChild.params.subscribe(
      params =>
        this.currentPanel = params['panel']
    )


  }

  getUsers() {
    this.budgetService.getUsers()
      .subscribe(
      users => this.users = users
      )
  }

}
