import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../services/AuthService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AuthService, AuthStorageHelper]
})
export class HomePage {

    username: string;
    roles: Object;
    navMenu: Object;

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private authService: AuthService,
        private authStorageHelper: AuthStorageHelper
    ) {
        menu.enable(true);
        this.username = authStorageHelper.getUserName();
        this.roles = authStorageHelper.getUserRoles();

        this.navMenu = [
            {label: "Mon profil", page: "profil"}
        ];
    }

    openPage(page) {
        if (page === "profil") { this.navCtrl.push(ProfilePage) }
    }

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
