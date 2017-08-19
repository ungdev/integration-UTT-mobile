import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { StudentsPage } from '../pages/students/students';
import { TeamsPage } from '../pages/teams/teams';
import { TeamPage } from '../pages/team/team';
import { CheckinsPage } from '../pages/checkins/checkins';
import { ChatPage } from '../pages/chat/chat';
import { PushMessagesPage } from '../pages/pushMessages/pushMessages';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { PlatformHelper } from '../helpers/PlatformHelper';
import { AuthService } from '../services/AuthService';

@Component({
    templateUrl: 'app.html',
    providers: [AuthService, AuthStorageHelper, PlatformHelper]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage:any = LoginPage;

    pages: Array<{title: string, component: any}>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public events: Events,
        public push: Push,
        public splashScreen: SplashScreen,
        private authService: AuthService,
        private authStorageHelper: AuthStorageHelper,
        private platformHelper: PlatformHelper,
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
                this.pages.push({ title: 'Mon équipe', component: TeamPage });
            }

            if (roles['admin']) {
                this.pages.push({ title: 'Etudiants', component: StudentsPage });
                this.pages.push({ title: 'Equipes', component: TeamsPage });
                this.pages.push({ title: 'Checkins', component: CheckinsPage });

                // if the app is run on device, the admin can send notifications
                if (this.platformHelper.isMobile(this.platform)) {
                    this.pages.push({ title: 'Notifications', component: PushMessagesPage });
                }

                this.pages.push({ title: 'Chat', component: ChatPage });
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
     * If the app run on a device, try to unregister the Firebase token
     * and redirect the user to the login page
     */
    startLogout() {
        if (this.platformHelper.isMobile(this.platform)) {
            this.push.unregister().then(_ => {
                console.log("Unregistered to push notifications");
                this.endLogout();
            }).then(_ => {
                console.log("Failed to unregister to push notifications");
            });
        } else {
            this.endLogout();
        }
    }

    /**
     * Make a request to revoke the user's token, clean the localStorage
     * and redirect the user to the login page
     */
    private endLogout() {
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
