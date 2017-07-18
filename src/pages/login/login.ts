import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { AuthService } from '../../services/AuthService';
import { StudentService } from '../../services/StudentService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [AuthService, StudentService, AuthStorageHelper]
})
export class LoginPage {

    loginForm: FormGroup;
    loader: any;

    constructor (
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private fb: FormBuilder,
        private authService: AuthService,
        private studentService: StudentService,
        private authStorageHelper: AuthStorageHelper
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
    }

    ngOnInit() {
        // start by checking if there is an authorization_code in the url
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
        this.studentService.get("0")
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                    this.authStorageHelper.setUserInfo(parsedData);
                    this.navCtrl.push(HomePage);
                    this.loader.dismiss();
                },
                err => console.log("err : ", err)
            );
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
                    this.navCtrl.push(HomePage);
                },
                err => console.log("err : ", err)
            )
    }

    loginWithEtuUTT() {
        this.authService.getEtuUTTLoginUrl()
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                    window.location.href = parsedData.redirectUri;
                },
                err => console.log("err : ", err)
            )
    }

}
