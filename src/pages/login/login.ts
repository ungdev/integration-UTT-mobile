import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, @Inject(FormBuilder) fb: FormBuilder) {
    this.loginForm = fb.group({
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
  }

  loginWithEtuUTT() {
    console.log("etu utt login");
  }

}
