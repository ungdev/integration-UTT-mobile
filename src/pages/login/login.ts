import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { AuthService } from '../../services/AuthService';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [AuthService, AuthTokenStorageHelper]
})
export class LoginPage {

    loginForm: FormGroup;

    constructor (
        public navCtrl: NavController,
        private fb: FormBuilder,
        private authService: AuthService,
        private authTokenStorageHelper: AuthTokenStorageHelper
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
    }

    ngOnInit() {

        // check if login with etu utt : authorization_code in the url

        const fullUrl = window.location.href;
        const searchPart = fullUrl.split('?')[1];

        // if parameters in the url, check if there is an authorization_code
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
                            this.authTokenStorageHelper.setAccessToken(parsedData.access_token);
                            this.navCtrl.push(HomePage);
                        },
                        err => console.log("err : ", err)
                    );
            }
        } else {
            // if there is an access token in the localStorage, check if
            // this one is not revoked
            const accessToken = this.authTokenStorageHelper.getAccessToken();

            if (accessToken) {
                // check if the access token is valid
                this.authService.checkAccessToken(accessToken)
                    .subscribe(
                        data => this.navCtrl.push(HomePage),
                        err => console.log("err : ", err)
                    );
            }
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
                    this.authTokenStorageHelper.setAccessToken(parsedData.access_token);
                    this.authTokenStorageHelper.setRefreshToken(parsedData.refresh_token);
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
