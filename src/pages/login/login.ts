import { Component } from '@angular/core';
import { MenuController, NavController, Events, Platform, LoadingController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthService } from '../../services/AuthService';
import { StudentService } from '../../services/StudentService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { PlatformHelper } from '../../helpers/PlatformHelper';

@Component({
    templateUrl: 'login.html',
    providers: [AuthService, StudentService, AuthStorageHelper, PlatformHelper]
})
export class LoginPage {

    loginForm: FormGroup;
    loader: any;

    constructor (
        public navCtrl: NavController,
        public menu: MenuController,
        public loadingCtrl: LoadingController,
        public events: Events,
        public push: Push,
        public platform: Platform,
        private fb: FormBuilder,
        private authService: AuthService,
        private studentService: StudentService,
        private authStorageHelper: AuthStorageHelper,
        private platformHelper: PlatformHelper,
        private iab: InAppBrowser
    ) {
        this.loginForm = this.fb.group({
            'login': [
                null,
                [Validators.required]
            ],
            'password': [
                null,
                [Validators.required]
            ]
        });

        this.loader = this.loadingCtrl.create({
            content: "Chargement..."
        });
        this.loader.present();

        // disable menu on login page (can't navigate before login)
        this.menu.enable(false);
    }

    ngOnInit() {
        // start by checking if there is an authorization_code in the url (auth on browser)
        const fullUrl = window.location.href;
        const searchPart = fullUrl.split('?')[1];

        if (searchPart) {
            const parameters = searchPart.split('&');

            const authorization_code = parameters
                .map(p => p.split('='))
                .find(p => p[0] === "authorization_code");

            // if there is an authorization_code, send it to get an access token
            if (authorization_code) {
                this.authService.sendAuthorizationCode(authorization_code)
                    .subscribe(
                        data => {
                            const parsedData = JSON.parse(data._body);
                            this.authStorageHelper.setAccessToken(parsedData.access_token);
                            this.loadUserInfo();
                        },
                        err => {
                            console.log("err : ", err);
                            // if the authorization_code is not valid,
                            // check if there is a valid access token in the localStorage
                            this.checkAccessToken();
                        }
                    );
            }
        } else {
            // if no parameters in the url, then check if there is
            // a valid access token in the localStorage
            this.checkAccessToken();
        }
    }

    /**
     * Use authService to load main user info
     */
    private loadUserInfo() {
        // 0 to tell that we want to get the auth user (we don't have his id)
        this.studentService.get({id: "0"})
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                    this.authStorageHelper.setUserInfo(parsedData);
                    this.events.publish('user:logged');
                    this.loader.dismiss();
                    this.registerToPushNotifications();
                },
                err => console.log("err : ", err)
            );
    }

    /**
     * Register the device to receive push notifications
     * only if the app run on a device
     */
    private registerToPushNotifications() {
        if (this.platformHelper.isMobile(this.platform)) {
            console.log("app running on device");
            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                console.log('Token saved:', t.token);
            });
        }
    }

    /**
     * Check if there is a valid access token in the localStorage
     * If it's the case, redirect to home page
     */
    private checkAccessToken() {
        // if there is an access token in the localStorage, check if
        // this one is not revoked
        const accessToken = this.authStorageHelper.getAccessToken();

        if (accessToken) {
            // check if the access token is valid
            this.authService.checkAccessToken(accessToken)
                .subscribe(
                    data => this.loadUserInfo(),
                    err => {
                        console.log("err : ", err);
                        this.loader.dismiss();
                    }
                );
        } else {
            this.loader.dismiss();
        }
    }

    /**
    * Handle login form submission
    */
    submitLoginForm(data) {
        if (!this.loginForm.valid) return;

        this.authService.newcomerLogin(data.login, data.password)
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                    this.authStorageHelper.setAccessToken(parsedData.access_token);
                    this.authStorageHelper.setRefreshToken(parsedData.refresh_token);
                    this.events.publish('user:logged');
                },
                err => console.log("err : ", err)
            )
    }

    loginWithEtuUTT() {
        this.authService.getEtuUTTLoginUrl()
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);

                    if (!this.platformHelper.isMobile(this.platform)) {
                        window.location.href = parsedData.redirectUri;
                    } else {
                        // create a new InAppBrowser
                        const ref = this.iab.create(parsedData.redirectUri);
                        ref.on("loadstart")
                            .subscribe(data => {
                                // check if data.url contains authorization_code
                                const searchPart = data.url.split('?')[1];
                                searchPart.split('&').map(param => {
                                    let parts = param.split('=');
                                    // if there is an authorization_code, send it to the server
                                    if (parts[0] == 'authorization_code') {
                                        this.authService.sendAuthorizationCode(parts[1])
                                            .subscribe(
                                                data => {
                                                    // store the token and load user's info
                                                    const parsedData = JSON.parse(data._body);
                                                    this.authStorageHelper.setAccessToken(parsedData.access_token);
                                                    this.loadUserInfo();
                                                    // close the InAppBrowser after login
                                                    ref.close();
                                                },
                                                err => {
                                                    console.log("err : ", err);
                                                }
                                            );
                                    }
                                })
                            });
                    }
                },
                err => console.log("err : ", err)
            )
    }

}
