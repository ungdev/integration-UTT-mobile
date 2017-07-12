import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { LoginService } from './login.service';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [LoginService, AuthTokenStorageHelper]
})
export class LoginPage {

    loginForm: FormGroup;

    constructor (
        public navCtrl: NavController,
        private fb: FormBuilder,
        private loginService: LoginService,
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

        this.loginService.newcomerLogin(data.login, data.password)
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                    this.authTokenStorageHelper.setAccessToken(parsedData.access_token);
                    this.authTokenStorageHelper.setRefreshToken(parsedData.refresh_token);
                },
                err => console.log("err : ", err)
            )
    }

    loginWithEtuUTT() {
        console.log("etu utt login");
    }

}
