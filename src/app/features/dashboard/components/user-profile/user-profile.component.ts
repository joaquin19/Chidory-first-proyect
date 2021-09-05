import { Component, OnInit } from '@angular/core';

import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public currentUser: any;

  constructor() {
    this.currentUser = {};
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
  }

}
