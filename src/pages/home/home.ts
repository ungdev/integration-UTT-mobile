import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthService } from '../../services/AuthService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AuthService, AuthStorageHelper]
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private authStorageHelper: AuthStorageHelper
    ) {}

    /**
     * Handle click on logout button.
     * Make a request to revoke the user's token, clean the localStorage
     * and redirect the user to the login page
     */
    logout() {
        const accessToken = this.authStorageHelper.getAccessToken();
        this.authService.revokeAccessToken(accessToken)
            .subscribe(
                data => {
                    this.authStorageHelper.clear();
                    this.navCtrl.push(LoginPage);
                },
                err => {
                    console.log("err : ", err);
                }
            )
    }

}
