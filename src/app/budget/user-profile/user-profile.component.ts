import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../budget.service';
import { UserProfile } from '../models';
import { UtilService } from '../../shared/util/util.service';

@Component({
  selector: 'budget-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: string;
  year: string;
  userProfile: UserProfile;
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
    if (name == "All") {
      this.budgetService.getUserProfiles()
        .subscribe(
        userProfiles =>
          this.userProfile = this.utilService.combineObjectValues<UserProfile>(new UserProfile("All"), userProfiles)
        );
      return;
    }
    this.budgetService.getUserProfile(name)
      .subscribe(
      userProfile => this.userProfile = userProfile
      )
  }
}
