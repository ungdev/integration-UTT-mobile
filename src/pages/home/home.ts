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
        if (accessToken === undefined || accessToken === null) {
            // check if there is an authorization_code in the url

            const fullUrl = window.location.href;
            const searchPart = fullUrl.split('?')[1];

            if (!searchPart) {
                this.navCtrl.push(LoginPage);
                return;
            }

            const parameters = searchPart.split('&');

            const authorization_code = parameters
                .map(p => p.split('='))
                .find(p => p[0] === "authorization_code");

            if (authorization_code) {
                this.authService.sendAuthorizationCode(authorization_code)
                    .subscribe(
                        data => {
                            const parsedData = JSON.parse(data._body);
                            this.authTokenStorageHelper.setAccessToken(parsedData.access_token);
                        },
                        err => console.log("err : ", err)
                    )
            } else {
                this.navCtrl.push(LoginPage);
            }

        } else {
            // else, try to refresh the token, using the refresh_token. If it fail, redirect to login page.
            const refreshToken = this.authTokenStorageHelper.getRefreshToken();

            if (refreshToken) {
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

    }

    /**
     * Handle click on logout button.
     * Make a request to revoke the user's token, clean the localStorage
     * and redirect the user to the login page
     */
    logout() {
        const accessToken = this.authTokenStorageHelper.getAccessToken();
        this.authService.revokeAccessToken(accessToken)
            .subscribe(
                data => {
                    this.authTokenStorageHelper.clearTokens();
                    this.navCtrl.push(LoginPage);
                },
                err => {
                    console.log("err : ", err);
                }
            )
    }

}
