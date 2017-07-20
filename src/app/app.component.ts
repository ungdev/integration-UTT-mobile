import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { NewcomersPage } from '../pages/newcomers/newcomers';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { AuthService } from '../services/AuthService';

@Component({
    templateUrl: 'app.html',
    providers: [AuthService, AuthStorageHelper]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage:any = LoginPage;

    pages: Array<{title: string, component: any}>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public events: Events,
        public splashScreen: SplashScreen,
        private authService: AuthService,
        private authStorageHelper: AuthStorageHelper
    ) {
        this.initializeApp();

        // on user login, set the menu pages depending of his roles
        events.subscribe('user:logged', (user, time) => {

            const roles = authStorageHelper.getUserRoles();

            this.pages = [
                { title: 'Home', component: HomePage },
            ];

            if (roles['newcomer']) {
                this.pages.push({ title: 'Mon profil', component: ProfilePage });
            }

            if (roles['admin']) {
                this.pages.push({ title: 'Nouveaux', component: NewcomersPage });
            }

            this.nav.setRoot(HomePage);
        });

        this.pages = [];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
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
                    this.nav.setRoot(LoginPage);
                },
                err => {
                    console.log("err : ", err);
                }
            )
    }


}
