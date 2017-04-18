import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserProfile } from '../models';
import { UtilService } from '../../shared/util/util.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'budget-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: Observable<UserProfile[]>;
  user: string;
  year: string;
  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.user = params['user'];
        this.getUserProfile(this.user);
      }
    )
  }

  getUserProfile(name): void {
    this.userProfile = this.budgetService.getUserProfile(name);
  }
}
