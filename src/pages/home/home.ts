import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LoginService } from '../login/login.service';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginService, AuthTokenStorageHelper]
})
export class HomePage {

  constructor(public navCtrl: NavController, private loginService: LoginService, private authTokenStorageHelper: AuthTokenStorageHelper) {}

  ngOnInit() {
      // read the authentication token in the localStorage
      const accessToken = this.authTokenStorageHelper.getAccessToken();

      // if there is no token, redirect to login page
      if (!accessToken) {
          this.navCtrl.push(LoginPage);
      } else {
          // else, try to refresh the token, using the refresh_token. If it fail, redirect to login page.
          const refreshToken = this.authTokenStorageHelper.getRefreshToken();

          this.loginService.refreshAccessToken(refreshToken)
              .subscribe(
                  data => {
                      const parsedData = JSON.parse(data._body);
                      this.authTokenStorageHelper.setAccessToken(parsedData.access_token);
                      this.authTokenStorageHelper.setRefreshToken(parsedData.refresh_token);
                  },
                  err => {
                      console.log("err : ", err);
                      this.navCtrl.push(LoginPage);
                  }
              )
      }

  }

}
