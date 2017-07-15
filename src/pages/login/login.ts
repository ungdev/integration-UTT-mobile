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
        console.log("etu utt login");
    }

}
