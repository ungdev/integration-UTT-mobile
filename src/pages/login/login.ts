import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      'login': [
        null,
        [
          Validators.required
        ]
      ],
      'password': [
        null,
        [
          Validators.required
        ]
      ]
    });
  }

  /**
   * Handle login form submission
   */
  submitLoginForm(data) {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(data);
    this.loginService.newcomerLogin(data.login, data.password)
        .subscribe(
            data => console.log("ok : ", data),
            err => console.log("err : ", err)
        )

  }

  loginWithEtuUTT() {
    console.log("etu utt login");
  }

}
