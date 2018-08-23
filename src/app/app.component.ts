import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Push } from '@ionic/cloud-angular';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { StudentsPage } from '../pages/students/students';
import { TeamsPage } from '../pages/teams/teams';
import { TeamPage } from '../pages/team/team';
import { CheckinsPage } from '../pages/checkins/checkins';
import { ChatPage } from '../pages/chat/chat';
// import { LocationPage } from '../pages/location/location';
// import { PushMessagesPage } from '../pages/pushMessages/pushMessages';
import { OneSignal } from '@ionic-native/onesignal'
import { CalendarPage } from '../pages/calendar/calendar';

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
    navbarTitle: string = "";
    debug: string = ""
    pages: Array<{title: string, component: any}>;

    constructor(
        public app: App,
        public platform: Platform,
        public statusBar: StatusBar,
        public events: Events,
       // public push: Push,
        public splashScreen: SplashScreen,
        private authService: AuthService,
        private authStorageHelper: AuthStorageHelper,
        private platformHelper: PlatformHelper,
        private oneSignal: OneSignal,
    ) {
        this.initializeApp();

        // on user login, set the menu pages depending of his roles

        this.pages = []
        events.subscribe('user:logged', (user, time) => {
            const roles = authStorageHelper.getUserRoles()

            this.pages = [
                { title: "Home", component: HomePage },
                { title: "Calendrier", component: CalendarPage },
                { title: "Profil", component: ProfilePage }
            ];

            if (roles['newcomer'] || roles['ce']) {
                this.pages.push({ title: "Mon équipe", component: TeamPage });
            }

            if (roles['admin'] || roles['ce'] || roles['orga'] || roles['secu']) {
                this.pages.push({ title: "Checkins", component: CheckinsPage });
            }
            if(roles['orga'] || roles['admin']) {
                this.pages.push({ title: "Chat", component: ChatPage })
            }

            if (roles['admin']) {
                this.pages.push({ title: "Etudiants", component: StudentsPage });
                this.pages.push({ title: "Equipes", component: TeamsPage });
                // this.pages.push({ title: "Notifications", component: PushMessagesPage });
                //this.pages.push({ title: "Localisation", component: LocationPage });
            }
            console.log(roles)
            if(this.platformHelper.isMobile(this.platform)) {
              this.oneSignal.startInit('f0132e96-aa21-48a8-82b7-a82660cb5132', '935939627079');

              this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

              this.oneSignal.handleNotificationReceived().subscribe(() => {
              // do something when notification is received
              });

              this.oneSignal.handleNotificationOpened().subscribe(() => {
              // do something when a notification is opened
              });

              this.oneSignal.endInit()

              this.oneSignal.sendTags(roles)
            }
            this.nav.setRoot(HomePage)
        });

        // listen view changes
        app.viewWillEnter.subscribe(view => this.onViewChange(view));
    }

    /**
     * On view change, updated the navbarTitle
     *
     * @param View view: the view loaded
     */
    onViewChange(view) {
        if (view.instance instanceof HomePage) {
            this.navbarTitle = "Intégration UTT";
            return;
        }
        for (let page of this.pages) {
            if (view.instance instanceof page.component) {
                this.navbarTitle = page.title;
                return;
            }
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {

            


            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault()
            this.statusBar.backgroundColorByHexString('#0D2C54')
            this.statusBar.overlaysWebView(false)
            this.statusBar.styleLightContent()
            this.splashScreen.hide();

            // override device back button behavior
            this.platform.registerBackButtonAction(_ => {
                if (this.nav.canGoBack()){
                    this.nav.pop();
                } else {
                    //don't do anything
                }
            }, 100);
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
            /*this.push.unregister().then(_ => {
                console.log("Unregistered to push notifications");
                this.endLogout();
            }).then(_ => {
                console.log("Failed to unregister to push notifications");
            });*/
        }
        this.endLogout();
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
