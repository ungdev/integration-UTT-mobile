import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AuthStorageHelper]
})
export class HomePage {

    username: string;
    roles: Object;
    navMenu: Object;

    constructor(
        public navCtrl: NavController,
        private authStorageHelper: AuthStorageHelper
    ) {
        this.username = authStorageHelper.getUserName();
    }

}
