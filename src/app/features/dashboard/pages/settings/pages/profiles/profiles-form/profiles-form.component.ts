import { Component, OnInit } from '@angular/core';

import { UserAuthenticationModel } from '@app/core/models/auth.model';

@Component({
  selector: 'app-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss']
})
export class ProfilesFormComponent implements OnInit {

  public pageRedirect: string;
  public currentUser: any;


  constructor() {
    this.pageRedirect = '/dashboard/settings/profiles';
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
  }

}
