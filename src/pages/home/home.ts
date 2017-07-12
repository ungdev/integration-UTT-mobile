import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthTokenStorageHelper]
})
export class HomePage {

  constructor(public navCtrl: NavController, private authTokenStorageHelper: AuthTokenStorageHelper) {}

  ngOnInit() {
      // read the authentication token in the localStorage
      const token = this.authTokenStorageHelper.getToken();

      // if there is no token, redirect to login page
      if (!token) {
          this.navCtrl.push(LoginPage);
      }

  }

}
