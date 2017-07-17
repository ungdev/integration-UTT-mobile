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

    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private authTokenStorageHelper: AuthTokenStorageHelper
    ) {}

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
