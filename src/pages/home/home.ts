import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthService } from '../../services/AuthService';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AuthService, AuthTokenStorageHelper]
})
export class HomePage {

    constructor(public navCtrl: NavController, private authService: AuthService, private authTokenStorageHelper: AuthTokenStorageHelper) {}

    ngOnInit() {
        // read the authentication token in the localStorage
        const accessToken = this.authTokenStorageHelper.getAccessToken();

        // if there is no token, redirect to login page
        if (!accessToken) {
            this.navCtrl.push(LoginPage);
        } else {
            // else, try to refresh the token, using the refresh_token. If it fail, redirect to login page.
            const refreshToken = this.authTokenStorageHelper.getRefreshToken();

            this.authService.refreshAccessToken(refreshToken)
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

    logout() {
        const accessToken = this.authTokenStorageHelper.getAccessToken();
        this.authService.revokeAccessToken(accessToken)
            .subscribe(
                data => {
                    this.authTokenStorageHelper.clearTokens();
                    console.log("ok : ", data);
                },
                err => {
                    console.log("err : ", err);
                }
            )
    }

}
